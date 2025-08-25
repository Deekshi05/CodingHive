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

// Simple CORS configuration
app.use(
  cors({
    origin: [
      'https://codinghive-frontend.onrender.com',
      'http://localhost:5173',
      'http://localhost:5174',
      process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(cookieParser());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Add a simple test route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cors: req.headers.origin 
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
