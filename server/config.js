import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default config; 