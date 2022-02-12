const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const meetingRoute = require('./routes/meeting.routes');
const quizRoute = require('./routes/quiz.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/meeting', meetingRoute);
app.use('/quiz', quizRoute);

const port = process.env.PORT || 5000;
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});