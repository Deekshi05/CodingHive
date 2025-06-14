import express from "express";
import { connectClient } from "./config/mongodb_config.js";
import { authroute } from "./routes/auth_router.js";
import {fetchYoutubeDiscussions} from "./controllers/contestDiscussioncontroller.js";
import {getupcomingcontests} from "./controllers/dashboard_controller.js";
import { getCodechefStats } from "./utils/platforms/codechef_profile.js";
import { getCodeforcesStats } from "./utils/platforms/codeforces_profile.js";
import { LogoutController } from "./controllers/auth_controller.js";
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
    // await getCodeforcesContests();
    // await getCodeChefContests();
    // await getLeetCodeContests();
    app.use("/", authroute);
    app.get("/dashboard", getupcomingcontests);
    app.get("/past-contests",fetchYoutubeDiscussions);
    app.get("/logout",LogoutController);
    app.get("/stats/codeforces/:userId", getCodeforcesStats);
    app.get("/stats/codechef/:userId", getCodechefStats);
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

startServer();
