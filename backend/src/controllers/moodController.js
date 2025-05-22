const analyzeSentiment = require('../utils/sentimentAnalysis');

class MoodController {
  constructor(moodModel) {
    this.moodModel = moodModel;
  }

  // ✅ Save mood entry for the logged-in user
  async saveMood(req, res) {
    try {
      const { user_id, mood, notes } = req.body;

      if (!user_id || !mood || !notes) {
        return res.status(400).json({ error: 'User ID, mood, and notes are required.' });
      }

      // Sentiment analysis
      const sentiment = analyzeSentiment(notes);

      const moodEntry = {
        user_id, // Make sure this is snake_case to match the DB column
        mood,
        notes,
        sentiment: sentiment.polarity,
        subjectivity: sentiment.subjectivity,
        date: new Date()
      };

      console.log('📥 Saving mood entry:', moodEntry);

      const moodId = await this.moodModel.save(moodEntry);
      res.status(201).json({ message: 'Mood saved successfully!', moodId });

    } catch (error) {
      console.error('❌ Error saving mood:', error.message);
      res.status(500).json({ error: 'Failed to save mood.' });
    }
  }

  // ✅ Get last 7 days of moods for a specific user
  async getWeeklyMood(req, res) {
    try {
      const user_id = req.query.user_id;

      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required for mood chart.' });
      }

      const moods = await this.moodModel.getWeeklyMood(user_id);
      res.status(200).json(moods);
    } catch (error) {
      console.error('❌ Error retrieving weekly mood:', error.message);
      res.status(500).json({ error: 'Failed to retrieve weekly mood data.' });
    }
  }
}

module.exports = MoodController;

