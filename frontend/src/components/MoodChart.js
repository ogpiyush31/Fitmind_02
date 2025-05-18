import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { getWeeklyMood } from '../services/api'; // ✅ Corrected path

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const MoodChart = () => {
    const [moodData, setMoodData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoodData = async () => {
            try {
                const data = await getWeeklyMood();
                setMoodData(data);
            } catch (error) {
                console.error('Error fetching mood data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMoodData();
    }, []);

    const data = {
        labels: moodData.map(entry => new Date(entry.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Mood Score',
                data: moodData.map(entry => entry.sentiment),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4
            },
        ],
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
            <h2>Weekly Mood Chart</h2>
            {loading ? <p>Loading...</p> : <Line data={data} />}
        </div>
    );
};

export default MoodChart;

