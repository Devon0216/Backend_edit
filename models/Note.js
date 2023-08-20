const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        workshop: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Workshop'
        },
        content: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('Note', noteSchema)