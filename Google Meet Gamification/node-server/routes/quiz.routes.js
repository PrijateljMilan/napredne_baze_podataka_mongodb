const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

router.get('/', async (req,res) => {
    try{
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.json({messange: err})
    }
});

router.post('/', async(req, res) => {
    const quiz = new Quiz({
        question: req.body.question,
        answer: req.body.answer,
        options: req.body.options,
    });
    try{
        const savedQuiz = await quiz.save();
        res.json(savedQuiz);
    } catch (err){
        res.json({message: err});
    }
});

router.delete('/', async(req, res) => {
    const meet = await Quiz.deleteMany({})
    res.json(meet)
   })   


module.exports = router;