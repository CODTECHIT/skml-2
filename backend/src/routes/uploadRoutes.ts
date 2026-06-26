import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { protect, authorize } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

const router = express.Router();

router.post("/", protect, authorize("admin"), upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload a file" });
  }

  const { type } = req.query; // 'product', 'category', 'banner'
  
  let folder = "ecommerce/general";
  let transformation: any[] = [];

  if (type === "product") {
    folder = "ecommerce/products";
    transformation = [{ width: 800, height: 800, crop: "fill" }];
  } else if (type === "category") {
    folder = "ecommerce/categories";
    transformation = [{ width: 400, height: 400, crop: "fill" }];
  } else if (type === "banner") {
    folder = "ecommerce/banners";
    transformation = [{ width: 1920, height: 700, crop: "fill" }];
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder, transformation },
    (error, result) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Upload to Cloudinary failed", error });
      }
      res.status(200).json({ 
        success: true, 
        message: "File uploaded", 
        url: result?.secure_url,
        public_id: result?.public_id
      });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
});

export default router;
