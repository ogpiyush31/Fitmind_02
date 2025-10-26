// frontend/src/components/MotivationalQuote.jsx

import React, { useState, useEffect } from 'react';

const quotes = [
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "The secret of getting ahead is getting started.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Your limitation is only your imagination."
];

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Select a random quote when the component loads
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []); // The empty array ensures this runs only once per load

  return (
    <div className="motivational-quote" style={{
      margin: '2rem auto',
      padding: '1rem',
      maxWidth: '600px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      borderLeft: '3px solid #00e5ff'
    }}>
      <p style={{ margin: 0, fontStyle: 'italic', color: '#f0f0f0' }}>"{quote}"</p>
    </div>
  );
};

export default MotivationalQuote;