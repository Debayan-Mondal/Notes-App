const Note = require('../model/Note.js')



async function getAllNotes(req,res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch(err) {
        console.log("Error in getAll Controller",err);
        res.status(500).json({message: "Internal server error"})
    }
}

async function createNote(req,res) {
    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content})

        await newNote.save();
        res.status(201).json({message: "Note created successfully"});
    } catch(err) {
        console.log("Error in createNote Controller",err);
        res.status(500).json({message: "Internal server error"})
    }
}

async function updateNote(req,res) {
    res.status(201).json({message: "Note updated succesfully"});
}

async function deleteNote(req,res) {
    res.status(201).json({message: "Notes created succesfully"});
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote};
