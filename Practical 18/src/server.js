const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/notes', require('./routes/notes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Notes API',
    version: '1.0.0',
    endpoints: {
      'GET /api/notes': 'Get all notes',
      'GET /api/notes/:id': 'Get note by ID',
      'POST /api/notes': 'Create new note',
      'PUT /api/notes/:id': 'Update note by ID',
      'DELETE /api/notes/:id': 'Delete note by ID'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});