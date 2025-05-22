const pool = require('../config/dbConfig');

class Mood {
  // Save mood entry with validation
  static async save(moodEntry) {
    const { user_id, mood, notes, sentiment, subjectivity, date } = moodEntry;

    // ✅ Validate required fields
    const requiredFields = [user_id, mood, notes, sentiment, subjectivity, date];
    if (requiredFields.some((field) => field === undefined)) {
      throw new Error('One or more required mood fields are undefined.');
    }

    const query = `
      INSERT INTO moods (user_id, mood, notes, sentiment, subjectivity, date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [user_id, mood, notes, sentiment, subjectivity, date];

    try {
      console.log('🟢 Final values going into DB:', values);
      const [result] = await pool.execute(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to save mood entry: ' + error.message);
    }
  }

  // Get last 7 days of mood data for a user
  static async getWeeklyMood(user_id) {
    const query = `
      SELECT mood, notes, sentiment, subjectivity, date
      FROM moods
      WHERE user_id = ?
        AND date >= CURDATE() - INTERVAL 7 DAY
      ORDER BY date DESC
    `;

    try {
      const [rows] = await pool.execute(query, [user_id]);
      return rows;
    } catch (error) {
      throw new Error('Failed to retrieve weekly mood data: ' + error.message);
    }
  }
}

module.exports = Mood;




