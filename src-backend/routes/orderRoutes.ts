import express from "express";
import { getOrders, getOrderById, createOrder, updateOrder } from "../controllers/orderController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route("/:id")
  .get(protect, getOrderById)
  .put(protect, authorize("admin"), updateOrder);

export default router;
