import express from 'express';
import { LoginController, RegisterController, refreshTokenController, LogoutController } from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.post('/token/refresh', refreshTokenController);
router.post("/logout", LogoutController);

export const authroute = router;
