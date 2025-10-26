// backend/controllers/moodController.js

const axios = require('axios');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const gamificationController = require('./gamificationController');

// Initialize the Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// A helper function for adding delays
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// ✅ NEW: Fallback SVG generation function
/**
 * Generates a local, abstract SVG image based on detected emotions.
 * This serves as a reliable fallback if external APIs fail.
 * @param {Array<Object>} emotions - An array of emotion objects, e.g., [{ label: 'joy', score: 0.9 }]
 * @returns {string} A base64 encoded SVG data URL.
 */
const generateFallbackImage = (emotions) => {
  const emotionColors = {
    joy: '#FFD700', // Gold
    surprise: '#9FE2BF', // Seafoam Green
    sadness: '#4682B4', // Steel Blue
    anger: '#DC143C', // Crimson
    fear: '#4B0082', // Indigo
    disgust: '#556B2F', // Dark Olive Green
    neutral: '#B0C4DE', // Light Steel Blue
  };

  const primaryEmotion = emotions[0]?.label || 'neutral';
  const secondaryEmotion = emotions[1]?.label || primaryEmotion;

  const color1 = emotionColors[primaryEmotion];
  const color2 = emotionColors[secondaryEmotion];

  // A simple abstract SVG with overlapping circles
  const svg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#2c3e50" />
      <circle cx="200" cy="200" r="150" fill="${color1}" opacity="0.7" filter="url(#blur)" />
      <circle cx="312" cy="312" r="120" fill="${color2}" opacity="0.8" filter="url(#blur)" />
    </svg>
  `;

  // Return as a base64 data URL
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};


class MoodController {
  constructor(moodModel) {
    this.moodModel = moodModel;
  }

  async saveMood(req, res) {
    try {
      const { user_id, journal, notes } = req.body;
      
      if (typeof user_id !== 'number' || !journal) {
        return res.status(400).json({ error: 'Invalid input. User ID and journal entry are required.' });
      }

      // --- AI Pipeline Steps 1 & 2: Get Emotions ---
      let emotions = [];
      let dominantEmotion = 'neutral';
      try {
        const emotionResponse = await axios.post('http://localhost:5003/analyze-emotions', { journal_text: journal });
        emotions = emotionResponse.data.emotions;
        if (emotions.length > 0) dominantEmotion = emotions[0].label;
        console.log('🧠 AI-Detected Emotions:', dominantEmotion);
      } catch (aiError) {
        console.error('❌ Error calling Python AI service:', aiError.message);
      }

      // --- AI Pipeline Step 3: Generate Art (with local fallback) ---
      let imageUrl = null;
      try {
        const secondaryEmotion = emotions[1] ? `and a hint of ${emotions[1].label}` : '';
        const prompt = `An abstract, therapeutic oil painting representing the feeling of ${dominantEmotion} ${secondaryEmotion}. Moody, atmospheric, surreal style.`;
        
        console.log(`🎨 Attempting to generate art with DeepAI service: "${prompt}"`);
        
        const deepAiResponse = await axios.post(
            'https://api.deepai.org/api/text2img',
            `text=${encodeURIComponent(prompt)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'api-key': process.env.DEEPAI_API_KEY
                }
            }
        );
        
        imageUrl = deepAiResponse.data.output_url;
        console.log('✅ Art generated successfully via DeepAI!');

      } catch (artError) {
        const errorMessage = artError.response ? JSON.stringify(artError.response.data) : artError.message;
        console.error(`❌ External art generation failed: ${errorMessage}`);
        
        // ✅ FALLBACK: Generate a local SVG image if the API fails
        console.log('🎨 Generating local fallback SVG image.');
        imageUrl = generateFallbackImage(emotions);
      }
      
      // --- AI Pipeline Step 4: Generate Empathetic Dialogue with Retry Logic ---
      let aiResponseText = null;
      const maxRetries = 3;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const prompt = `You are FitMind, a caring wellness assistant. A user just wrote this journal entry: "${journal}". Based on their detected dominant emotion of '${dominantEmotion}', respond with one short, gentle, and open-ended question to help them reflect. Do not give advice. Keep your response under 25 words.`;

          const result = await geminiModel.generateContent(prompt);
          const response = await result.response;
          aiResponseText = response.text().trim();
          console.log('💬 Gemini Dialogue Generated:', aiResponseText);
          break; 
        } catch (dialogueError) {
          console.error(`❌ Error generating dialogue with Gemini (Attempt ${attempt}/${maxRetries}):`, dialogueError.message);
          if (attempt === maxRetries) {
            console.error('❌ All retry attempts for Gemini failed.');
          } else {
            await delay(1000); 
          }
        }
      }

      // --- Prepare data and save to database ---
      const moodEntry = {
        user_id,
        mood: dominantEmotion,
        notes: notes || '',
        journal,
        image_url: imageUrl,
        ai_response: aiResponseText,
        // ✅ REMOVED: The date property is removed to let the database handle the timestamp.
      };

      const moodId = await this.moodModel.saveMood(moodEntry);

      // --- AI Pipeline Step 5: Update Gamification Stats ---
      try {
        const newStreak = await gamificationController.updateStreak(user_id);
        await gamificationController.checkAndAwardBadges(user_id, newStreak, !!imageUrl);
        console.log(`🔥 User ${user_id} streak updated to ${newStreak}`);
      } catch (gamificationError) {
        console.error('❌ Error updating gamification stats:', gamificationError);
      }

      // --- Send final response to frontend ---
      res.status(201).json({
        message: 'Analysis complete!',
        moodId,
        imageUrl,
        aiResponse: aiResponseText,
      });

    } catch (error) {
      console.error('❌ Error in saveMood controller:', error.message);
      res.status(500).json({ error: 'Failed to save mood.' });
    }
  }

  async getWeeklyMood(req, res) {
    try {
      const user_id = parseInt(req.query.user_id, 10);
      if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ error: 'User ID is required and must be a number.' });
      }
      const moods = await this.moodModel.getWeeklyMood(user_id);
      res.status(200).json(moods);
    } catch (error) {
      console.error('❌ Error retrieving weekly mood:', error.message);
      res.status(500).json({ error: 'Failed to retrieve weekly mood data.' });
    }
  }

  async getAllMoods(req, res) {
    try {
      const user_id = parseInt(req.query.user_id, 10);
      if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ error: 'User ID is required and must be a number.' });
      }
      const moods = await this.moodModel.getAllMoods(user_id);
      res.status(200).json(moods);
    } catch (error) {
      console.error('❌ Error retrieving all moods:', error.message);
      res.status(500).json({ error: 'Failed to retrieve all moods.' });
    }
  }
}

module.exports = MoodController;

