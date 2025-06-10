import express from "express";
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import { connectClient } from "./config/mongodb_config.js";
import { authroute } from "./routes/auth_router.js";
import {getUserProfileStats} from "./controllers/profile_controller.js"
import {getupcomingcontests} from "./controllers/dashboard_controller.js";
import { getCodeChefContests } from "./utils/platforms/codechef.js";
import { getCodeforcesContests } from "./utils/platforms/codeforces.js";
import { getLeetCodeContests } from "./utils/platforms/leetcode.js";
import {protect} from "./middleware/protect.js"
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

async function startServer() {
  try {
    await connectClient();
    await getCodeforcesContests();
    await getCodeChefContests();
    await getLeetCodeContests();
    app.use("/", authroute);
    app.get("/profile", protect, getUserProfileStats);
    app.get("/dashboard", getupcomingcontests);
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

startServer();
