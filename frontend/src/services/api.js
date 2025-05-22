import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// ✅ Save Mood Entry
export const saveMood = async (moodData) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in.');

    // Send mood data along with user_id (as required by backend)
    const payload = {
      ...moodData,
      user_id: parseInt(userId), // ensure it's a number
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
      params: { user_id: parseInt(userId) }, // match backend param
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error fetching weekly mood:', error.response?.data || error.message);
    throw error;
  }
};
