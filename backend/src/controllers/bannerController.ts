import { Request, Response, NextFunction } from "express";
import { Banner } from "../models/Banner";
import { ErrorResponse } from "../utils/errorResponse";
import { z } from "zod";

const bannerSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  image: z.string().min(1),
  redirectUrl: z.string().min(1),
  tag: z.string().optional(),
  type: z.enum(["hero", "promo"]).optional(),
  status: z.enum(["Active", "Disabled"]).optional(),
  order: z.number().optional(),
});

export const getBanners = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: Record<string, any> = {};
    if (req.query.type) filter.type = req.query.type;
    const banners = await Banner.find(filter).sort({ order: 1 });
    res.status(200).json({ success: true, message: "Banners fetched", data: banners });
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = bannerSchema.parse(req.body);
    const banner = await Banner.create(data);
    res.status(201).json({ success: true, message: "Banner created", data: banner });
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = bannerSchema.partial().parse(req.body);
    const banner = await Banner.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!banner) return next(new ErrorResponse("Banner not found", 404));
    res.status(200).json({ success: true, message: "Banner updated", data: banner });
  } catch (error) {
    next(error);
  }
};

import cloudinary from "../config/cloudinary";

const extractPublicId = (url: string) => {
  try {
    const parts = url.split("/");
    const filename = parts.pop()?.split(".")[0];
    const folder = parts.slice(parts.indexOf("upload") + 2).join("/");
    return folder && filename ? `${folder}/${filename}` : null;
  } catch (e) {
    return null;
  }
};

export const deleteBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return next(new ErrorResponse("Banner not found", 404));

    if (banner.image) {
      const publicId = extractPublicId(banner.image);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Cloudinary deletion failed", error);
        }
      }
    }

    await banner.deleteOne();
    res.status(200).json({ success: true, message: "Banner deleted", data: {} });
  } catch (error) {
    next(error);
  }
};
