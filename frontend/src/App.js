// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodForm from './components/MoodForm';
import MoodChart from './components/MoodChart';
import UpliftingMessages from './components/UpliftingMessages';
import './style.css'; // Make sure to include your CSS

function App() {
  return (
    <Router>
      <div className="App">
        {/* Date in top-right corner */}
        <div className="date-display">{new Date().toDateString()}</div>

        {/* Title slightly moved right and colored */}
        <h1 style={{ textAlign: 'center', marginLeft: '50px', color: '#c0c0c0' }}>
          FitMind: Mental Fitness Journal
        </h1>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MoodForm />} />
          <Route path="/mood-chart" element={<MoodChart />} />
          <Route path="/uplifting-messages" element={<UpliftingMessages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
