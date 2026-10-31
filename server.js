// server.js — Express backend for the Event Feedback Management System.
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Level 2 — simple welcome route, useful for confirming the server is alive.
app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to the Event Feedback API' });
});

// Level 3 & 4 — create feedback (validated on both client and server).
app.post('/api/feedback', (req, res) => {
  const { event_name, attendee_name, rating, comments } = req.body;

  if (!event_name || !attendee_name || !rating) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }
  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ success: false, error: 'Rating must be a number from 1 to 5.' });
  }

  const stmt = db.prepare(`
    INSERT INTO feedback (event_name, attendee_name, rating, comments)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(event_name, attendee_name, ratingNum, comments || '');

  res.status(201).json({ success: true, id: info.lastInsertRowid });
});

// Level 3 — retrieve all feedback, most recent first.
app.get('/api/feedback', (req, res) => {
  const rows = db.prepare('SELECT * FROM feedback ORDER BY created_at DESC').all();
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
