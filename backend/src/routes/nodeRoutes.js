const express = require('express');
const notesController = require("../controllers/notesController.js")
const router = express.Router();

router.get("/",notesController.getAllNotes);

router.post("/",notesController.createNote);

router.put("/:id",notesController.updateNote);

router.delete("/:id",notesController.deleteNote);


module.exports = router;