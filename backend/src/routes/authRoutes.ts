import express from "express";
import { register, login, profile, logout, forgotPassword, resetPassword, refresh } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/profile", protect, profile);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

export default router;
