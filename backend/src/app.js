require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const moodRoutes = require('./routes/moodRoutes'); // ✅ changed
const authRoutes = require('./routes/authRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes'); 

const app = express();
const port = process.env.PORT || 5002;

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://fitmind-02.onrender.com",
    "https://fitmind-frontend-tfhb.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ✅ Routes
app.use('/api', moodRoutes);          // ✅ Mood routes
app.use('/api/auth', authRoutes);     // ✅ Auth routes
app.use('/api', gamificationRoutes); 
// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('FitMind Backend Running 🚀');
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});


