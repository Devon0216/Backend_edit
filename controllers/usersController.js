const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

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
    const { username, password } = req.body

    if (!username || !password ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.find({ username: `${username}`, password: `${password}` }).lean().exec()

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
    const { username } = req.body

    // console.log("username")
    // console.log(username)

    if (!username  ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.find({ username: `${username}` }).lean().exec()

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
    const { username, password } = req.body

    // Confirm data
    if (!username || !password ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    // const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": password }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, password, workshops } = req.body

    // Confirm data 
    if (!id || !username || !roles) {
        return res.status(400).json({ message: 'All fields except password are required' })
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
    user.roles = roles

    if (password) {
        // Hash password 
        user.password = password// salt rounds 
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