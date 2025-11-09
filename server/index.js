// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors()); // Allow requests from any origin
app.use(express.json({ limit: '5mb' })); // Allow large JSON payloads for our big form

// --- Database Connection ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// --- API Endpoints ---
app.get('/', (req, res) => {
  res.send('Survey API is running!');
});

app.post('/submit', async (req, res) => {
  try {
    const formData = req.body;

    // Connect to the database and create table if it doesn't exist
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        submission_data JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert the new submission
    const result = await client.query(
      'INSERT INTO submissions (submission_data) VALUES ($1) RETURNING id',
      [formData]
    );

    client.release();
    console.log('Submission saved with ID:', result.rows[0].id);
    res.status(201).json({ success: true, message: 'Submission received!', id: result.rows[0].id });

  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // Use comma-separated logging to ensure the PORT value is printed as a number
  console.log('Server is listening on port', PORT);
});
