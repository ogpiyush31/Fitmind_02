// backend/src/controllers/gamificationController.js
const db = require('../config/dbConfig');

/**
 * Gets a date string in 'YYYY-MM-DD' format based on the server's local timezone.
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */
const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

class GamificationController {
    async updateStreak(userId) {
        // --- Corrected Date Logic ---
        const today = getLocalDateString(new Date());
        
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = getLocalDateString(yesterdayDate);
        // --------------------------

        const [streakRows] = await db.execute('SELECT current_streak, last_entry_date FROM user_streaks WHERE user_id = ?', [userId]);

        if (streakRows.length === 0) {
            // First entry ever for this user, start streak at 1
            await db.execute('INSERT INTO user_streaks (user_id, current_streak, last_entry_date) VALUES (?, 1, ?)', [userId, today]);
            return 1;
        }

        const streak = streakRows[0];
        // ✅ FIX: Use the helper function to format the date from the database
        // This avoids timezone issues with .toISOString()
        const lastEntryDate = getLocalDateString(new Date(streak.last_entry_date));

        if (lastEntryDate === today) {
            // User has already made an entry today, so the streak does not change.
            console.log(`🔥 Streak for user ${userId} is already ${streak.current_streak} (entry already made today).`);
            return streak.current_streak;
        } else if (lastEntryDate === yesterday) {
            // This is a consecutive day, so increment the streak.
            const newStreak = streak.current_streak + 1;
            await db.execute('UPDATE user_streaks SET current_streak = ?, last_entry_date = ? WHERE user_id = ?', [newStreak, today, userId]);
            return newStreak;
        } else {
            // The streak is broken, so reset it to 1.
            await db.execute('UPDATE user_streaks SET current_streak = 1, last_entry_date = ? WHERE user_id = ?', [today, userId]);
            return 1;
        }
    }

    async checkAndAwardBadges(userId, newStreak) {
        // Award "First Entry" - this will only succeed the first time
        await this.awardBadge(userId, 1); 
        
        // Award "First MoodScape"
        await this.awardBadge(userId, 2);

        // Check for streak badges
        if (newStreak >= 7) await this.awardBadge(userId, 3);
        if (newStreak >= 30) await this.awardBadge(userId, 4);
    }

    async awardBadge(userId, badgeId) {
        try {
            // INSERT IGNORE prevents errors if the user already has the badge
            await db.execute('INSERT IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)', [userId, badgeId]);
        } catch (error) {
            console.error(`Error awarding badge ${badgeId} to user ${userId}:`, error);
        }
    }
    
    async getGamificationData(req, res) {
        try {
            const userId = parseInt(req.query.user_id, 10);
            const [streakRows] = await db.execute('SELECT current_streak FROM user_streaks WHERE user_id = ?', [userId]);
            const [badgeRows] = await db.execute(
                'SELECT b.name, b.description, b.icon FROM user_badges ub JOIN badges b ON ub.badge_id = b.id WHERE ub.user_id = ?',
                [userId]
            );
            
            res.status(200).json({
                streak: streakRows.length > 0 ? streakRows[0].current_streak : 0,
                badges: badgeRows
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve gamification data.' });
        }
    }
}

module.exports = new GamificationController();

