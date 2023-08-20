const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default: "Facilitator"
    },
    workshops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    }],
})

module.exports = mongoose.model('User', userSchema)