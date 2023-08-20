const Note = require('../models/Note')
const User = require('../models/User')
const Workshop = require('../models/Workshop')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

// @desc Get all workshops 
// @route GET /workshops
// @access Private
const getAllWorkshops = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const workshops = await Workshop.find().lean()

    // If no notes 
    if (!workshops?.length) {
        return res.status(400).json({ message: 'No workshops found' })
    }

    res.json(workshops)
})

// @desc Get one user workshops 
// @route GET /workshops/userworkshop
// @access Private
const getUserWorkshops = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const { userid } = req.body
    // console.log("Serverside: " + userid)

    if (!userid ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const workshops = await Workshop.find({ User: `${userid}` }).lean().exec()

    // If no users 
    if (!workshops?.length) {
        return res.status(400).json({ message: 'No workshops found' })
    }

    res.json(workshops)
})




// @desc Get one user workshops 
// @route GET /workshops/workshopid
// @access Private
const getWorkshopByName = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const { workshopname } = req.body
    // console.log("Serverside: " + userid)

    if (!workshopname ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const workshops = await Workshop.find({ workshopname: `${workshopname}` }).lean().exec()

    // If no users 
    if (!workshops?.length) {
        return res.status(400).json({ message: 'No workshops found' })
    }

    res.json(workshops)
})


// @desc Get one user workshops 
// @route GET /workshops/workshopid
// @access Private
const getWorkshopById = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const { id } = req.body
    // console.log("Serverside: " + userid)

    if (!id ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const workshop = await Workshop.findById(id).exec()
    // If no users 
    if (!workshop) {
        return res.status(400).json({ message: 'No workshops found' })
    }

    res.json(workshop)
})


// // @desc Get one user workshops 
// // @route GET /workshops/workshopid
// // @access Private
// const getWorkshopById = asyncHandler(async (req, res) => {
//     // Get all notes from MongoDB
//     const { id } = req.body
//     // console.log("Serverside: " + userid)

//     if (!id ) {
//         return res.status(400).json({ message: 'ID is required' })
//     }

//     const workshop = await Workshop.findById(id).exec()

//     // If no users 
//     if (!workshop?.length) {
//         return res.status(400).json({ message: 'No workshops found' })
//     }

//     res.json(workshop)
// })



// @desc Create new workshop
// @route POST /workshop
// @access Private
const createNewWorkshop = asyncHandler(async (req, res) => {
    const { User, Note, workshopname } = req.body

    // Confirm data
    if (!User || !workshopname ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // // Check for duplicate title
    const duplicate = await Workshop.findOne({ workshopname }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate workshopname' })
    }

    // Create and store the new user 
    const workshop = await Workshop.create({ User, workshopname })

    if (workshop) { // Created 
        return res.status(201).json({ message: 'New workshop created' })
    } else {
        return res.status(400).json({ message: 'Invalid workshop data received' })
    }

})

// @desc Update a workshop
// @route PATCH /workshops
// @access Private
const updateWorkshop = asyncHandler(async (req, res) => {
    const { id, User, Note, workshopname } = req.body

    // Confirm data
    if (!id || !Array.isArray(Note) ) {
        return res.status(400).json({ message: 'ID is required' })
    }

    // Confirm note exists to update
    const workshop = await Workshop.findById(id).exec()

    if (!workshop) {
        return res.status(400).json({ message: 'Workshop not found' })
    }

    // // Check for duplicate title
    // const duplicate = await Note.findOne({ title }).lean().exec()

    // // Allow renaming of the original note 
    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    // workshop.User = User
    if (Note){
        workshop.Note = Note
    }
    // if (workshopname){
    //     workshop.workshopname = workshopname
    // }

    const updatedWorkshop = await workshop.save()

    res.json(`'${updatedWorkshop.workshopname}' updated`)
})


// @desc Update a workshop
// @route PATCH /userworkshop
// @access Private
const addAgenda = asyncHandler(async (req, res) => {
    const { id,  workshopAgenda } = req.body

    // Confirm data
    if (!id  ) {
        return res.status(400).json({ message: 'ID is required' })
    }

    // Confirm note exists to update
    const workshop = await Workshop.findById(id).exec()

    if (!workshop) {
        return res.status(400).json({ message: 'Workshop not found' })
    }

    // // Check for duplicate title
    // const duplicate = await Note.findOne({ title }).lean().exec()

    // // Allow renaming of the original note 
    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    // workshop.User = User
    if (workshopAgenda){
        workshop.workshopAgenda = workshopAgenda
    }
    // if (workshopname){
    //     workshop.workshopname = workshopname
    // }

    const updatedWorkshop = await workshop.save()

    res.json(`'${updatedWorkshop.workshopname}' updated`)
})


// @desc Update a workshop
// @route PATCH /userworkshop
// @access Private
const addSummary = asyncHandler(async (req, res) => {
    const { id,  workshopSummary } = req.body

    // Confirm data
    if (!id ) {
        return res.status(400).json({ message: 'ID is required' })
    }

    // Confirm note exists to update
    const workshop = await Workshop.findById(id).exec()

    if (!workshop) {
        return res.status(400).json({ message: 'Workshop not found' })
    }

    workshop.workshopSummary = workshopSummary

    const updatedWorkshop = await workshop.save()

    res.json(`'${updatedWorkshop.workshopname}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteWorkshop = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const workshop = await Workshop.findById(id).exec()

    if (!workshop) {
        return res.status(400).json({ message: 'Workshop not found' })
    }

    const result = await workshop.deleteOne()

    const reply = `Workshop '${result.workshopname}'  deleted`

    res.json(reply)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteAgenda = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const workshop = await Workshop.findById(id).exec()

    if (!workshop) {
        return res.status(400).json({ message: 'Workshop not found' })
    }

    workshop.workshopAgenda = ""

    await workshop.save();

    res.json(workshop)
})

module.exports = {
    getAllWorkshops,
    getUserWorkshops,
    getWorkshopByName,
    getWorkshopById,
    createNewWorkshop,
    updateWorkshop,
    addAgenda,
    addSummary,
    deleteWorkshop,
    deleteAgenda
}