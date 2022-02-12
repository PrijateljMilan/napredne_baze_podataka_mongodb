const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({
    meet_code:
    {
        type: String,
        require: true
    },
    meet_name:
    {
        type: String,
        require: true
    },
    active:
    {
        type: Boolean
    },
    students:
    [{
        name: {type: String},
        email: {type: String},
        poens: {type: Number, default: 0}
    }]
}, { timestamps: true })

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting