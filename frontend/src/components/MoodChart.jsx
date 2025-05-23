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
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const data = await getWeeklyMood(); // ✅ No need to pass userId
        setMoodData(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      } catch (err) {
        console.error(err);
        setError('Failed to load mood data');
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, []);

  const chartData = {
    labels: moodData.map(entry =>
      new Date(entry.date).toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Mood Sentiment',
        data: moodData.map(entry => entry.sentiment),
        fill: false,
        backgroundColor: '#00e5ff',
        borderColor: '#00e5ff',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#ffffff' },
      },
      tooltip: {
        callbacks: {
          label: context => `Sentiment: ${context.raw}`,
        },
      },
      title: {
        display: true,
        text: 'Your Weekly Mood Trend',
        color: '#ffffff',
        font: { size: 20 },
      },
    },
    scales: {
      x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' }, beginAtZero: true },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <h2 style={{ textAlign: 'center', color: '#ffffff' }}>📈 Mood Chart</h2>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#ccc' }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : moodData.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#ff8a80' }}>No mood entries found.</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default MoodChart;


