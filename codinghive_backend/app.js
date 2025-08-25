import express from "express";
import { connectClient } from "./config/mongodb_config.js";
import { authRoute, dashboardRoute, passwordRoute } from "./routes/index.js";
import { fetchYoutubeDiscussions } from "./controllers/index.js";
import { fetchUserStats } from "./controllers/ProfileStatsController.js";
import { updateUserHandle } from "./controllers/updateuserhandleController.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { protect } from "./middleware/protect.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration for production deployment
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'https://codinghive-frontend.onrender.com',
        'http://localhost:5173',
        'http://localhost:5174',
        process.env.FRONTEND_URL
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 200
  })
);

// Handle preflight requests explicitly
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());

// Additional CORS headers middleware for production
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://codinghive-frontend.onrender.com',
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL
  ].filter(Boolean);
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Accept,Origin');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Enhanced debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.headers['user-agent']);
  if (req.method === 'OPTIONS') {
    console.log('Preflight request detected');
  }
  next();
});

// Add a simple test route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cors: req.headers.origin,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test CORS endpoint
app.get('/test-cors', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

app.post('/test-cors', (req, res) => {
  res.json({
    message: 'CORS POST is working!',
    origin: req.headers.origin,
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Define routes before starting server
app.use("/", authRoute);
app.use("/password", passwordRoute);
app.use("/dashboard", protect, dashboardRoute);
app.get("/userstats/:userId", protect, fetchUserStats);
app.get("/past-contests", protect, fetchYoutubeDiscussions);
app.patch("/:userId/handle", protect, updateUserHandle);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

async function startServer() {
  try {
    await connectClient();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

startServer();
