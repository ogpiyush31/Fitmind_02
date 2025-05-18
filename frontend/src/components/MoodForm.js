import React, { useState } from 'react';
import { saveMood } from '../services/api';
import { motion } from 'framer-motion';
import { Smile, Heart, Send } from 'lucide-react';

const MoodForm = () => {
  const [mood, setMood] = useState('');
  const [feelings, setFeelings] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Use 'notes' instead of 'feelings'
      await saveMood({ mood, notes: feelings });
      setMessage('✅ Mood saved successfully!');
      setMood('');
      setFeelings('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving mood:', error);
      setMessage('❌ Error saving mood. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <motion.div
      className="glass-form"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="title">🧠 FitMind</h1>
      <p className="subtitle">Track your mental fitness daily.</p>

      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <Smile className="icon" /> Mood
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="input"
            placeholder="Happy, Anxious, Calm..."
            required
          />
        </label>

        <label className="label">
          <Heart className="icon" /> What’s going on?
          <textarea
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
            className="textarea"
            placeholder="Share your thoughts here..."
            required
          />
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit"
        >
          <Send className="icon" /> Save Mood
        </motion.button>
      </form>

      {message && (
        <motion.div
          className={`feedback ${message.includes('Error') ? 'error' : 'success'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoodForm;
