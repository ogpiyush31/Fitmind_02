const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConfig');

const router = express.Router();

// -------------------- LOGIN --------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Optional: You can add JWT here if needed later
    res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// -------------------- REGISTER --------------------
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

module.exports = router;



