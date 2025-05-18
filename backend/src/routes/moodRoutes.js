const express = require('express');
const router = express.Router();
const MoodController = require('../controllers/moodController');
const MoodModel = require('../models/moodModel');

// Use controller and model
const moodController = new MoodController(MoodModel);

// Route to save mood
router.post('/moods', (req, res) => moodController.saveMood(req, res));

// Route to get weekly mood
router.get('/moods/weekly', (req, res) => moodController.getWeeklyMood(req, res));

module.exports = (app) => {
    app.use('/api', router);
};
