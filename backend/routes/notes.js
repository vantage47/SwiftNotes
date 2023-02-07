const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator'); //Need validation in ROUTE2 that whether the nnotes user is putting is in valid formatt or not
const Note = require('../models/Notes') //using schema of Notes in Models Folder

//ROUTE1: Get all the Notes using: GET "/api/notes/fetchallnotes".. Login required hence used fetchuser (middleware)...
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

//ROUTE2: Add a new Note using: POST "/api/notes/addnotes".. Login required hence used fetchuser (middleware)...
router.post('/addnotes', fetchuser,
    [            //We will set validation inside this array regardinng vvalid format of notes.. Copied from validation docs..
        // Title minimum size is 2
        body('title', 'Title minimum length should be 2').isLength({ min: 2 }),
        // email must be an email format
        body('description', 'Description should be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;
        //If there are errors with the format of input like length or email is not valid mail, return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send('Enter Valid Input').json({ errors: errors.array() });
        }
        try {
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNotes = await note.save()
            res.json(savedNotes)
        }
        catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }
})

//ROUTE3: Update an existing Note using: PUT "/api/notes/updatenote/:id"..For update we can use POST but generally PUT is used as standard Procedure... Login required hence used fetchuser (middleware)...
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a newNote Object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id); //req.params.id is id we mentioned in url i.e. /updatenotes/:id.. Here we are finding the note by using its id to update it..
        if (!note) { return res.status(404).send("Not Found") } //If there is no note by the id we mentioned so we give Error 404
        //Allow Updation if Note Found but first we confirm user.. 
        if (note.user.toString() !== req.user.id) { //Here we are confirming whether the person updating notes is same as the person who created it.. We are here fetching user id with the help of Notes ID.. So basically on line 57, note is trying to find whether note in id we mentioned in url exists or not and then by writing note.user.toString we are retreiving its user id and authenticating it in line 60.. 
            return res.status(401).send("Access Denied") //If a user tries to update note which is not created by it.. So we tell him, he don't have access to do so.. 
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

//ROUTE4: Update an existing Note using: DELETE "/api/notes/deletenote/:id"..For update we can use POST but generally PUT is used as standard Procedure... Login required hence used fetchuser (middleware)...
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id); //req.params.id is id we mentioned in url i.e. /deletenotes/:id.. Here we are finding the note by using its id to update it..
        if (!note) { return res.status(404).send("Not Found") } //If there is no note by the id we mentioned so we give Error 404
        //Allow Deletion if Note Found but first we confirm user.. 
        if (note.user.toString() !== req.user.id) { //Here we are confirming whether the person deleting notes is same as the person who created it.. We are here fetching user id with the help of Notes ID.. So basically on line 72, note is trying to find whether note in id we mentioned in url exists or not and then by writing note.user.toString we are retreiving its user id and authenticating it in line 75.. 
            return res.status(401).send("Access Denied") //If a user tries to update note which is not created by it.. So we tell him, he don't have access to do so.. 
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router