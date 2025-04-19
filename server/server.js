const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Log the MongoDB URI (without sensitive information)
console.log('Attempting to connect to MongoDB at:', config.mongoURI ? 'mongodb://localhost:27017/TipsDanielBlog' : 'undefined');

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('MongoDB URI:', config.mongoURI);
    console.error('Environment variables:', {
      MONGO_URI: process.env.MONGO_URI,
      NODE_ENV: process.env.NODE_ENV
    });
    process.exit(1); // Exit if cannot connect to database
  });

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
}); 