import express from "express";
import { getBanners, createBanner, updateBanner, deleteBanner } from "../controllers/bannerController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .get(getBanners)
  .post(protect, authorize("admin"), createBanner);

router.route("/:id")
  .put(protect, authorize("admin"), updateBanner)
  .delete(protect, authorize("admin"), deleteBanner);

export default router;
