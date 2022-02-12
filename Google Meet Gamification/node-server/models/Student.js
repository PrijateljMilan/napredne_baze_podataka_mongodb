const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name:
    {
        type: String,
        require: true
    },
    email:
    {
        type: String,
        require: true
    },
    poens:
    {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Student = mongoose.model('Student', studentSchema);
module.exports = Student