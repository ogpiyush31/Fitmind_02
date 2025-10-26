const express = require('express');
const router = express.Router();
const MoodController = require('../controllers/moodController');
const MoodModel = require('../models/moodModel');
const db = require('../config/dbConfig');

// ✅ Instantiate the model and controller
const moodModel = new MoodModel(db);
const moodController = new MoodController(moodModel);

// ✅ POST /api/moods - Save mood + journal
router.post('/moods', async (req, res) => {
  try {
    await moodController.saveMood(req, res);
  } catch (err) {
    console.error('Error in POST /moods:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET /api/moods/weekly?user_id=xx - Weekly mood data
router.get('/moods/weekly', async (req, res) => {
  try {
    await moodController.getWeeklyMood(req, res);
  } catch (err) {
    console.error('Error in GET /moods/weekly:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET /api/moods?user_id=xx - All mood entries
router.get('/moods', async (req, res) => {
  try {
    await moodController.getAllMoods(req, res);
  } catch (err) {
    console.error('Error in GET /moods:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Export routes
module.exports = router;
