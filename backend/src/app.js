require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setMoodRoutes = require('./routes/moodRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register mood routes
setMoodRoutes(app);

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});





