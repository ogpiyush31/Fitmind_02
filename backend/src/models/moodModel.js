// backend/models/moodModel.js

const pool = require('../config/dbConfig');

class MoodModel {
  constructor(db) {
    this.db = db || pool;
  }

  async saveMood(moodEntry) {
    const {
      user_id,
      mood,
      notes,
      journal,
      image_url,
      ai_response,
    } = moodEntry;

    // ✅ CORRECTION: The 'date' column is removed from the query.
    // This allows the database to use its `DEFAULT CURRENT_TIMESTAMP` setting,
    // which correctly uses the server's local time.
    const query = `
      INSERT INTO moods (user_id, mood, notes, journal, image_url, ai_response)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [user_id, mood, notes, journal, image_url, ai_response];

    try {
      const [result] = await this.db.execute(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error('❌ Failed to save mood entry to database: ' + error.message);
    }
  }

  async getWeeklyMood(user_id) {
    // This query is specifically for the chart and aggregates data by day
    const query = `
      SELECT 
        DATE(date) as entry_date, 
        AVG(CASE 
             WHEN mood = 'joy' THEN 0.8
             WHEN mood = 'surprise' THEN 0.6
             WHEN mood = 'neutral' THEN 0
             WHEN mood = 'sadness' THEN -0.6
             WHEN mood = 'anger' THEN -0.8
             WHEN mood = 'fear' THEN -0.9
             WHEN mood = 'disgust' THEN -0.7
             ELSE 0 
           END) as avg_sentiment
      FROM moods
      WHERE 
        user_id = ? AND date >= CURDATE() - INTERVAL 7 DAY
      GROUP BY 
        DATE(date)
      ORDER BY 
        entry_date ASC;
    `;

    try {
      const [rows] = await this.db.execute(query, [user_id]);
      return rows;
    } catch (error) {
      throw new Error('❌ Failed to retrieve weekly mood data: ' + error.message);
    }
  }

  async getAllMoods(user_id) {
    const query = `
      SELECT id, mood, notes, journal, image_url, ai_response, date
      FROM moods
      WHERE user_id = ?
      ORDER BY date DESC
    `;

    try {
      const [rows] = await this.db.execute(query, [user_id]);
      return rows;
    } catch (error) {
      throw new Error('❌ Failed to retrieve all mood entries: ' + error.message);
    }
  }
}

module.exports = MoodModel;







