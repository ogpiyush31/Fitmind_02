// src/components/MoodForm.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveMood } from '../services/api';

function MoodForm() {
  const [notes, setNotes] = useState('');
  const [journal, setJournal] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [aiResponse, setAiResponse] = useState(null); // State for AI text response

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!journal.trim()) {
      setMessage('Please write a journal entry to analyze your mood.');
      setIsError(true);
      return;
    }

    // --- Start loading state ---
    setIsLoading(true);
    setGeneratedImage(null);
    setAiResponse(null); // Clear previous AI text
    setMessage('Your AI companion is reflecting...');
    setIsError(false);

    try {
      // Call the API, which now returns both the image and AI text
      const response = await saveMood({ notes, journal });
      
      setMessage('✅ Analysis Complete!');
      setGeneratedImage(response.imageUrl); // Set the new image
      setAiResponse(response.aiResponse); // Set the new text response
      
      // Clear the form fields
      setNotes('');
      setJournal('');

    } catch (error) {
      setMessage('❌ An error occurred. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="glass-form">
      <h2 className="form-title">🧠 How was your day?</h2>
      <p className="form-subtitle">Describe your thoughts below for a unique piece of art and a reflective question.</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Text area inputs for notes and journal */}
        <div className="form-group">
          <label htmlFor="notes" className="label">Summary (Optional)</label>
          <textarea 
            id="notes" 
            className="textarea" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="A brief note about your day..." 
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="journal" className="label">Journal Entry</label>
          <textarea 
            id="journal" 
            className="textarea" 
            value={journal} 
            onChange={(e) => setJournal(e.target.value)} 
            placeholder="Write about your day in detail here..." 
            required 
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="submit" disabled={isLoading}>
          {isLoading ? 'Reflecting...' : 'Save & Analyze'}
        </button>
      </form>

      {/* --- Display Feedback --- */}
      {isLoading ? (
        <p className="feedback">Your AI companion is reflecting, please wait...</p>
      ) : message && (
        <p className={`feedback ${isError ? 'error' : 'success'}`}>{message}</p>
      )}
      
      {/* --- Display AI Dialogue --- */}
      {aiResponse && !isLoading && (
        <div className="ai-dialogue-container" style={{ margin: '2rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', borderLeft: '3px solid #00d9c0' }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#f0f0f0' }}>"{aiResponse}"</p>
        </div>
      )}

      {/* --- Display the Generated Art --- */}
      {generatedImage && !isLoading && (
        <div className="mood-art-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>Your MoodScape</h3>
          <img 
            src={generatedImage} 
            alt="AI-generated art representing your mood" 
            style={{ maxWidth: '100%', borderRadius: '15px', marginTop: '1rem', border: '1px solid rgba(255, 255, 255, 0.2)' }} 
          />
        </div>
      )}
      
      <Link to="/mood-chart" className="chart-toggle-button" style={{ marginTop: '2rem' }}>
        View Mood Trends
      </Link>
    </div>
  );
}

export default MoodForm;