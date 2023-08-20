const express = require('express')
const router = express.Router()
const miroController = require('../controllers/miroController')

router.route('/')
    .get(miroController.getAllNotes)
    // .post(miroController.createNewNote)
    // .patch(miroController.updateNote)
    // .delete(miroController.deleteNote)

module.exports = router