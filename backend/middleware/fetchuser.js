var jwt = require('jsonwebtoken')
const JWT_SECRET = "Om_is_a_web-developer!!"

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token') //auth-token is mentioned in the header of Get User Data in the Thunder Client..
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" }) //401 is error "Access Denied"
    }
}
module.exports = fetchuser;