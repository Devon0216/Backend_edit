const Note = require('../models/Note')
// const User = require('../models/User')
const Workshop = require('../models/Workshop')
const asyncHandler = require('express-async-handler')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const notes = await Note.find().lean()

    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithWorkshop = await Promise.all(notes.map(async (note) => {
        const workshop = await Workshop.findById(note.workshop).lean().exec()
        return { ...note, workshopname: workshop.workshopname }
    }))

    res.json(notesWithWorkshop)
})




// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotesForOneWorkshop = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const { workshop } = req.body

    const notes = await Note.find({ workshop: `${workshop}` }).lean().exec()

    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }

    res.json(notes)
})



// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { workshop, content } = req.body

    // Confirm data
    if (!workshop || !content) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const note = await Note.create({ workshop, content })

    if (note) { // Created 
        return res.status(201).json(note)
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, workshop, content } = req.body

    // Confirm data
    if (!id || !workshop || !content ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    note.workshop = workshop
    note.content = content

    const updatedNote = await note.save()

    res.json(`'${updatedNote.content}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNoteByWorkshop = asyncHandler(async (req, res) => {
    const { workshop } = req.body

    // Confirm data
    if (!workshop) {
        return res.status(400).json({ message: 'Note workshop id required' })
    }

    // Confirm note exists to delete 
    const note = await Note.find({ workshop: `${workshop}` }).lean().exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await Note.deleteMany({ workshop: `${workshop}` })

    res.json(result)
})

module.exports = {
    getAllNotes,
    getAllNotesForOneWorkshop,
    createNewNote,
    updateNote,
    deleteNote,
    deleteNoteByWorkshop
}