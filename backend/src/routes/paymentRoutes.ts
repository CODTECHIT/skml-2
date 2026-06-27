import express from "express";
import { createOrder, verifyPayment, handleRazorpayWebhook } from "../controllers/paymentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.post("/webhook", handleRazorpayWebhook); // Public endpoint secured by signature validation

export default router;
