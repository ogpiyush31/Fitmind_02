// backend/src/routes/gamificationRoutes.js
const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');

router.get('/gamification', gamificationController.getGamificationData);

module.exports = router;