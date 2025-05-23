import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveMood } from '../services/api';
import { motion } from 'framer-motion';
import { Smile, Heart, Send, BarChart } from 'lucide-react';

const MoodForm = () => {
  const [mood, setMood] = useState('');
  const [feelings, setFeelings] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const userId = localStorage.getItem('userId');
    if (!userId) return setMessage('❌ You must be logged in to submit mood.');

    try {
      await saveMood({ userId, mood, notes: feelings });
      setMessage('✅ Mood saved successfully!');
      setMood('');
      setFeelings('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error saving mood. Please try again.');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <motion.div className="glass-form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="title">🧠 FitMind</h1>
      <p className="subtitle">Track your mental fitness daily.</p>

      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <Smile className="icon" /> Mood
          <input type="text" value={mood} onChange={e => setMood(e.target.value)} className="input" required />
        </label>

        <label className="label">
          <Heart className="icon" /> What’s going on?
          <textarea value={feelings} onChange={e => setFeelings(e.target.value)} className="textarea" required />
        </label>

        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="submit">
          <Send className="icon" /> Save Mood
        </motion.button>
      </form>

      <motion.button
        className="submit"
        style={{ marginTop: '15px', backgroundColor: '#0097a7' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/mood-chart')}
      >
        <BarChart className="icon" /> View Mood Chart
      </motion.button>

      {message && (
        <motion.div className={`feedback ${message.includes('Error') || message.includes('❌') ? 'error' : 'success'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoodForm;



