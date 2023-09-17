const express = require('express')
const User = require('../models/User') //Schema of User login imported
const router = express.Router()
const { body, validationResult } = require('express-validator'); //NPM package for validation of input such as If there are errors with the format of input like length or email is not valid mail, return Bad requests and the error...
const bcrypt = require('bcryptjs'); //NPM package for hashing and salt 
const jwt = require('jsonwebtoken'); //NPM package to generate Authentication token which will have my secret sign.. Suppose, pooja enters completes login and authToken is generated but now she used authToken of some different account with the intention to get its detail so my system shouldnt provide data of other person.. Read further on jwt.io 
const fetchuser = require('../middleware/fetchuser') //This is a middleware we will use while fetcing details of the user

const JWT_SECRET = "Om_is_a_web-developer!!"

//ROUTE1: Create a user using: POST "/api/auth/createuser", doesn't require login..
router.post('/createuser', [            //We will set validation inside this array like the min size of password.. Copied from validation docs..
    // Name minimum size is 2
    body('name', 'Name minimum length should be 2').isLength({ min: 2 }),
    // email must be an email format
    body('email', 'Enter a valid Email').isEmail(),
    // password must be at least 8 chars long
    body('password', 'Password should be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    //If there are errors with the format of input like length or email is not valid mail, return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //Check whether user with same email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry! A user with this E-Mail Already exists" })
        }
        //Creating a new user
        const salt = await bcrypt.genSalt(10); //It will generate salt that is used to solve limitation of hashing - "Rainbow Table".. Those function which returns promise should be written after 'await' and the arrow function should be async.. WE use await so to tell the compiler to wait there till bcrypt generates salt and then move to next line.. 
        var secPass = await bcrypt.hash(req.body.password, salt) //We combine our password with a salt and then we hash it so it could solve Rainbow Table problem
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })
    }
    catch (error) { 
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE2: Authenticate a user using: POST "/api/auth/login", doesn't require login..
router.post('/login', [            //We will set validation inside this array like the min size of password.. Copied from validation docs..
    // email must be an email format
    body('email', 'Enter a valid Email').isEmail(),
    // password cannot be empty
    body('password', 'Password should be atleast 8 characters').exists(),
], async (req, res) => {
    var success = false
    //If there are errors with the format of input like email is not valid mail and password shouldn't be empty, return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        //Checking if email entered exists or not
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Users do not exist" })
        }
        //Comparing passwords
        const passwordCompare = await bcrypt.compare(password, user.password) //Async Function (Returns Promise so we will wait till it get resolved)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Credentials do not Match" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE3: Get loggedin user details using: POST "/api/auth/getuser", Login required..
router.post('/getuser', fetchuser, async (req,res)=>{
    try {
        let userid = req.user.id
        const user = await User.findById(userid).select("-password") //Get user id from Auth Token and getting all details from that user id from DB except password...
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router