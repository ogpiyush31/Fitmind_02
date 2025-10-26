// frontend/src/components/MoodChart.jsx

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
  Legend,
} from 'chart.js';
import { getWeeklyMood } from '../services/api';

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
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const data = await getWeeklyMood();
        
        // Prepare data for the chart
        const labels = data.map(entry =>
          new Date(entry.entry_date).toLocaleDateString(undefined, { // ✅ FIX: Use 'entry_date'
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
        );
        const sentiments = data.map(entry => entry.avg_sentiment);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Mood Sentiment',
              data: sentiments,
              fill: false,
              backgroundColor: '#00e5ff',
              borderColor: '#00e5ff',
              tension: 0.3,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        });

      } catch (err) {
        console.error(err);
        setError('Failed to load mood data');
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, []);

  const chartOptions = {
    // ... your chart options remain the same ...
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ textAlign: 'center', color: '#ffffff' }}>📈 Mood Chart</h2>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#ccc' }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : chartData.labels.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#ff8a80' }}>No mood entries found for the last 7 days.</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default MoodChart;