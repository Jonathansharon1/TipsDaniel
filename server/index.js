import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRouter from './routes/blog.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import config from './config.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/blog', blogRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = err.statusCode || 500;
  const message = config.nodeEnv === 'production' 
    ? 'An error occurred' 
    : err.message;
    
  res.status(statusCode).json({ 
    status: 'error',
    message,
    ...(config.nodeEnv !== 'production' && { stack: err.stack })
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${config.nodeEnv} mode`);
}); 