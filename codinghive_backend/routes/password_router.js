
import express from "express";
const router=express.Router();
import {forgotpassword,resetpassword} from "../controllers/authorization/password_controller.js";
router.post("/forgot-password",forgotpassword);
router.post("/reset-password/:token",resetpassword);

export const passwordRoute=router;