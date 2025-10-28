const Note = require('../model/Note.js')



async function getAllNotes(req,res) {
    try {
        const notes = (await Note.find()).sort({createdAt: -1});
        res.status(200).json(notes);
    } catch(err) {
        console.error("Error in getAll Controller",err);
        res.status(500).json({message: "Internal server error"})
    }
}

async function createNote(req,res) {
    try{
        const {title, content} = req.body;
        const note = new Note({title, content})

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch(err) {
        console.error("Error in createNote Controller",err);
        res.status(500).json({message: "Internal server error"});
    }
}

async function updateNote(req,res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!updateNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updateNote);
    } catch(err) {
         console.error("Error in updateNote Controller",err);
        res.status(500).json({message: "Internal server error"});
    }
}

async function deleteNote(req,res) {
    try  {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note deleted sucessfully"})
    } catch(err) {
        console.error("Error in deleteNote controller",err);
        res.status(500).json({message: "Internal server error"});
    }
}

async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found!"});
        res.json(note);
    } catch(err) {
        console.error("Error in getNoteByID controller", err);
        res.status(500).json({message: "Internal Server error"});
    }
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote, getNoteById};
