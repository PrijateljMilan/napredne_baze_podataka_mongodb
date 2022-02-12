const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizSchema = new Schema({
    question:
    {
        type: String,
        require: true
    },
    answer:
    {
        type: String,
        require: true
    },
    options:
    [{
        type: String,
        require: true
    }]
})

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz