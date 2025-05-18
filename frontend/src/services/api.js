import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const saveMood = async (moodData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/moods`, moodData);
        if (response?.data) {
            return response.data;
        } else {
            throw new Error('No response data');
        }
    } catch (error) {
        console.error('Error saving mood:', error.response?.data || error.message);
        throw error;
    }
};

export const getWeeklyMood = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/moods/weekly`);
        if (response?.data) {
            return response.data;
        } else {
            throw new Error('No response data');
        }
    } catch (error) {
        console.error('Error fetching weekly mood:', error.response?.data || error.message);
        throw error;
    }
};
