import express from "express";
const router=express.Router();

import { getCodechefStats } from "../utils/platforms/codechef_profile.js";
import { getCodeforcesStats } from "../utils/platforms/codeforces_profile.js";
import {getLeetcodeStats} from "../utils/platforms/leetcode_profile.js";
router.get("/stats/codeforces/:userId", getCodeforcesStats);
router.get("/stats/codechef/:userId", getCodechefStats);
router.get("/stats/leetcode/:userId",getLeetcodeStats);
export const profileRoute=router;