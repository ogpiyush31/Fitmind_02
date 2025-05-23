require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Optional: logs requests

const setMoodRoutes = require('./routes/moodRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewarenpm
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://fitmind-02.onrender.com"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Optional: shows each request in terminal

// ✅ Routes
setMoodRoutes(app); // Mood routes
app.use('/api/auth', authRoutes); // Auth routes (login/register)

// ✅ Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('FitMind Backend Running 🚀');
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});


