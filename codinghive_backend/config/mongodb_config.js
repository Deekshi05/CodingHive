import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URL || process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ No MongoDB connection string found. Set MONGODB_URL or MONGO_URI in environment variables.");
  process.exit(1);
}

export async function connectClient() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'coding_hive', // ✅ Explicitly set your database name
      serverSelectionTimeoutMS: 5000 // Prevent hanging in case of network issues
    });
    console.log(`✅ MongoDB connected successfully to ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}
