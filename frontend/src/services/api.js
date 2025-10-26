// src/services/api.js
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// ✅ Save Mood Entry and get AI responses
export const saveMood = async ({ notes, journal }) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in.');

    const payload = {
      user_id: parseInt(userId),
      notes,
      journal,
    };

    const response = await axios.post(`${API_BASE_URL}/moods`, payload);
    return response.data; // This will return { message, moodId, imageUrl, aiResponse }
  } catch (error) {
    console.error('❌ Error saving mood:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch Weekly Mood Data for the chart
export const getWeeklyMood = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in.');

    const response = await axios.get(`${API_BASE_URL}/moods/weekly`, {
      params: { user_id: parseInt(userId) },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error fetching weekly mood:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ ADDED: Fetch Gamification Data (Streaks & Badges)
export const getGamificationData = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in.');

    const response = await axios.get(`${API_BASE_URL}/gamification`, {
      params: { user_id: parseInt(userId) },
    });
    return response.data; // This will return { streak, badges }
  } catch (error) {
    console.error('❌ Error fetching gamification data:', error.response?.data || error.message);
    throw error;
  }
};
