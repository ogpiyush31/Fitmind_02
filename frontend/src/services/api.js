import axios from 'axios';

// ✅ Correct base URL from .env
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// ✅ Save Mood Entry
export const saveMood = async ({ mood, notes }) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in.');

    const payload = {
      user_id: parseInt(userId),
      mood,
      notes,
    };

    const response = await axios.post(`${API_BASE_URL}/moods`, payload);
    return response.data;
  } catch (error) {
    console.error('❌ Error saving mood:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch Weekly Mood Data
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
