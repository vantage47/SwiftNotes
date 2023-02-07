const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {      //We want to associate a notes with a particular user so it cannot access other user's notes
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
        default: "General"
    },
});

module.exports = mongoose.model('notes', notesSchema)