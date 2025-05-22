const express = require('express');
const router = express.Router();
const MoodController = require('../controllers/moodController');
const MoodModel = require('../models/moodModel');

const moodController = new MoodController(MoodModel);

// POST /api/moods - Save mood
router.post('/moods', (req, res) => moodController.saveMood(req, res));

// ✅ GET /api/moods/weekly?user_id=xx - Weekly mood for logged-in user
router.get('/moods/weekly', (req, res) => moodController.getWeeklyMood(req, res));

module.exports = (app) => {
  app.use('/api', router);
};




