// frontend/src/components/Gamification.jsx
import React, { useEffect, useState } from 'react';
import { getGamificationData } from '../services/api'; // Make sure to create this function in api.js

const Gamification = () => {
  const [data, setData] = useState({ streak: 0, badges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGamificationData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading your stats...</p>;

  return (
    <div className="gamification-container" style={{ color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '15px' }}>
      <div className="streak-display" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '3rem' }}>🔥</span>
        <h2 style={{ margin: 0 }}>Current Streak: {data.streak} Days</h2>
      </div>
      <div className="badges-display">
        <h3 style={{ textAlign: 'center' }}>🏆 Badges Earned</h3>
        {data.badges.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.badges.map(badge => (
              <li key={badge.name} style={{ background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{badge.icon}</span>
                <span><strong>{badge.name}:</strong> {badge.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No badges earned yet. Keep journaling!</p>
        )}
      </div>
    </div>
  );
};

export default Gamification;