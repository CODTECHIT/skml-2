import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import { ErrorResponse } from "../utils/errorResponse";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
  status: z.enum(["Active", "Draft"]).optional(),
});

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, message: "Categories fetched", data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = categorySchema.parse(req.body);
    const category = await Category.create(data);
    res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = categorySchema.partial().parse(req.body);
    const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!category) return next(new ErrorResponse("Category not found", 404));
    res.status(200).json({ success: true, message: "Category updated", data: category });
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

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ErrorResponse("Category not found", 404));

    if (category.image) {
      const publicId = extractPublicId(category.image);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Cloudinary deletion failed", error);
        }
      }
    }

    await category.deleteOne();
    res.status(200).json({ success: true, message: "Category deleted", data: {} });
  } catch (error) {
    next(error);
  }
};
