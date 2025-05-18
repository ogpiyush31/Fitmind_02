const pool = require('../config/dbConfig');

class Mood {
    static async save(moodEntry) {
        const query = 'INSERT INTO moods (mood, notes, sentiment, subjectivity, date) VALUES (?, ?, ?, ?, ?)';
        const values = [moodEntry.mood, moodEntry.notes, moodEntry.sentiment, moodEntry.subjectivity, moodEntry.date];

        try {
            const [result] = await pool.execute(query, values); // ✅ works with promise-based pool
            return result.insertId;
        } catch (error) {
            throw new Error('Failed to save mood entry: ' + error.message);
        }
    }

    static async getWeeklyMood() {
        const query = `
            SELECT mood, notes, sentiment, subjectivity, date
            FROM moods
            WHERE date >= CURDATE() - INTERVAL 7 DAY
            ORDER BY date DESC
        `;
        try {
            const [rows] = await pool.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Failed to retrieve weekly mood data: ' + error.message);
        }
    }
}

module.exports = Mood;

