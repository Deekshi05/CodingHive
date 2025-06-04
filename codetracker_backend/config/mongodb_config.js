import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();


if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is not defined in .env");
  process.exit(1);
}

export const client = new MongoClient(process.env.MONGODB_URL);

export async function connectClient() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}
