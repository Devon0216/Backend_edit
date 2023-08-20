
const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const workshopSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        Note: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }],
        workshopname: {
            type: String,
            required: true
        },
        workshopAgenda: {
            type: String
        },
        workshopSummary: {
            type: String
        }
    }
)

module.exports = mongoose.model('Workshop', workshopSchema)