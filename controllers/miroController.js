const Note = require('../models/Note')
// const {miro} = require('../models/Miro')
const asyncHandler = require('express-async-handler')
// const { Miro } = require("@mirohq/miro-api");
const app = require('../server')
// const open = require('open');

// opens the url in the default browser 

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {

    // const miro = new Miro({
    //     clientId: "3458764560345376881",
    //     clientSecret: "Ut9LixsPne5ukQbVSPRsqtbfOoUV6QA2",
    //     redirectUrl: "http://localhost:3500/miro"
    //     });
    // const USER_ID = "WE_DONT_NEED_A_REAL_ID_FOR_THIS_EXAMPLE";

    // res.redirect("https://google.com");
    res.redirect("https://miro.com/oauth/authorize?response_type=code&client_id=3458764560345376881&redirect_uri=https://whiteboarddj.vercel.app//dash/authorize");
    // let board
    // if ( miro.isAuthorized(USER_ID)) {
    //      miro.handleAuthorizationCodeRequest(USER_ID, req);
    //     board = await miro.as(USER_ID).getBoard("uXjVMy3XuMY=");
    // }
    // else{
    //     res.redirect(miro.getAuthUrl());
    // }

    // res.json("board")

})

// // @desc Create new note
// // @route POST /notes
// // @access Private
// const createNewNote = asyncHandler(async (req, res) => {
//     const { user, title, text } = req.body

//     // Confirm data
//     if (!user || !title || !text) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Check for duplicate title
//     const duplicate = await Note.findOne({ title }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     // Create and store the new user 
//     const note = await Note.create({ user, title, text })

//     if (note) { // Created 
//         return res.status(201).json({ message: 'New note created' })
//     } else {
//         return res.status(400).json({ message: 'Invalid note data received' })
//     }

// })

// // @desc Update a note
// // @route PATCH /notes
// // @access Private
// const updateNote = asyncHandler(async (req, res) => {
//     const { id, user, title, text, completed } = req.body

//     // Confirm data
//     if (!id || !user || !title || !text || typeof completed !== 'boolean') {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Confirm note exists to update
//     const note = await Note.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Note not found' })
//     }

//     // Check for duplicate title
//     const duplicate = await Note.findOne({ title }).lean().exec()

//     // Allow renaming of the original note 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     note.user = user
//     note.title = title
//     note.text = text
//     note.completed = completed

//     const updatedNote = await note.save()

//     res.json(`'${updatedNote.title}' updated`)
// })

// // @desc Delete a note
// // @route DELETE /notes
// // @access Private
// const deleteNote = asyncHandler(async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'Note ID required' })
//     }

//     // Confirm note exists to delete 
//     const note = await Note.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Note not found' })
//     }

//     const result = await note.deleteOne()

//     const reply = `Note '${result.title}' with ID ${result._id} deleted`

//     res.json(reply)
// })

module.exports = {
    getAllNotes
    // createNewNote,
    // updateNote,
    // deleteNote
}