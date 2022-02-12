const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

router.get('/', (req,res) => {
    res.send('We are on Meeting.');
});

router.get('/:meet_code', async(req,res) => {
    const meet = await Meeting.find({ "meet_code": req.params.meet_code })
	res.send(meet)
});

router.post('/', async(req, res) => {
    const meeting = new Meeting({
        meet_code: req.body.meet_code,
        meet_name: req.body.meet_name,
        active: req.body.active,
        students: req.body.students
    });
    try{
        const savedMeeting = await meeting.save();
        res.json(savedMeeting);
    } catch (err){
        res.json({message: err});
    }
});

router.put('/:meet_code', async(req, res) => {
    const meet = await Meeting.updateOne({ "meet_code": req.params.meet_code },{"active": false})
    if (!meet) return res.status(404).json({})
    meet.active = req.body.active
    res.json(meet)
   })
   
module.exports = router;