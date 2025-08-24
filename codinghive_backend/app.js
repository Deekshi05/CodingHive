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

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // In development, allow localhost on any port
      if (process.env.NODE_ENV !== 'production') {
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
          return callback(null, true);
        }
      }
      
      // In production, only allow specific frontend URL
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:5174'
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

async function startServer() {
  try {
    await connectClient();

    app.use("/", authRoute);
    app.use("/password", passwordRoute);  // Remove protect middleware for password routes
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
