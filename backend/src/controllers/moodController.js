const analyzeSentiment = require('../utils/sentimentAnalysis');

class MoodController {
    constructor(moodModel) {
        this.moodModel = moodModel;
    }

    async saveMood(req, res) {
        try {
            const { mood, notes } = req.body;

            if (!mood || !notes) {
                return res.status(400).json({ error: 'Mood and notes are required.' });
            }

            const sentiment = analyzeSentiment(notes);
            const moodEntry = {
                mood,
                notes,
                sentiment: sentiment.polarity,
                subjectivity: sentiment.subjectivity,
                date: new Date()
            };

            const moodId = await this.moodModel.save(moodEntry);
            res.status(201).json({ message: 'Mood saved successfully!', moodId });
        } catch (error) {
            console.error('Error saving mood:', error);
            res.status(500).json({ error: 'Failed to save mood.' });
        }
    }

    async getWeeklyMood(req, res) {
        try {
            const weeklyMoodData = await this.moodModel.getWeeklyMood();
            res.status(200).json(weeklyMoodData);
        } catch (error) {
            console.error('Error retrieving weekly mood:', error);
            res.status(500).json({ error: 'Failed to retrieve weekly mood data.' });
        }
    }
}

module.exports = MoodController;
