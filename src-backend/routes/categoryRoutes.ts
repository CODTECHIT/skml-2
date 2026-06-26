import express from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .get(getCategories)
  .post(protect, authorize("admin"), createCategory);

router.route("/:id")
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

export default router;
