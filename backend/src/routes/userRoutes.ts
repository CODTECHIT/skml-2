import express from "express";
import { getCustomers } from "../controllers/userController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/customers", protect, authorize("admin"), getCustomers);

export default router;
