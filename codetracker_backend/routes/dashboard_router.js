
import express from "express";
const router=express.Router();
import {getupcomingcontests} from "../controllers/dashboard/upcoming_controller.js";
import {potdController} from "../controllers/dashboard/Potd_controller.js";

router.get("/upcoming-contests",getupcomingcontests);
router.get("/potd",potdController);

export const dashboardRoute=router;