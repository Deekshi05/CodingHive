import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Prefer Render's environment variable, fall back to local .env
const mongoURI = process.env.MONGODB_URL || process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ No MongoDB connection string found. Please set MONGODB_URL or MONGO_URI in environment variables.");
  process.exit(1);
}

export async function connectClient() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // 👇 Only set dbName if it is not already included in your connection string
      dbName: process.env.DB_NAME || 'coding_hive',
      serverSelectionTimeoutMS: 5000, // Prevent hanging if can't connect
    });

    console.log(`✅ MongoDB connected successfully to database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}
