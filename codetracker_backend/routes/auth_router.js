import express from 'express';
import { LoginController, RegisterController, refreshTokenController, LogoutController,GoogleLoginController } from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.post('/token/refresh', refreshTokenController);
router.post("/logout", LogoutController);
router.post('/google-login', GoogleLoginController);
export const authroute = router;
