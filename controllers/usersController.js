const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().lean().exec()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Get one user
// @route GET /users/username
// @access Private
const getOneUser = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const { username, miroId } = req.body

    if (!username || !miroId ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.find({ username: `${username}`, miroId: `${miroId}` }).lean().exec()

    // If no users 
    if (!user?.length) {
        return res.status(400).json({ message: 'No user found' })
    }

    res.json(user)
})

// @desc Get one user
// @route GET /users/username
// @access Private
const getUserByName = asyncHandler(async (req, res) => {
    // console.log("req.body")
    // console.log(req.body)
    // Get all users from MongoDB
    const { miroId } = req.body

    // console.log("username")
    // console.log(username)

    if (!miroId  ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.find({ miroId: `${miroId}` }).lean().exec()

    // If no users 
    if (!user?.length) {
        return res.status(400).json({ message: 'No user found' })
    }

    res.json(user)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, miroId } = req.body

    // Confirm data
    if (!username || !miroId ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ miroId }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate miro Id' })
    }

    // Hash password 
    // const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "miroId": miroId }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} with miro Id ${miroId} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, miroId, workshops } = req.body

    // Confirm data 
    if (!id || !username ) {
        return res.status(400).json({ message: 'All fields except miroId are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    // user.roles = roles

    if (miroId) {
        // Hash password 
        user.miroId = miroId// salt rounds 
    }

    if (workshops) {
        // Hash password 
        user.workshops = workshops// salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getOneUser,
    getUserByName,
    createNewUser,
    updateUser,
    deleteUser
}