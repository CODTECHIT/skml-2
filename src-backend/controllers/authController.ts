import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { ErrorResponse } from "../utils/errorResponse";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    const user = await User.create(data);
    generateToken(res, user._id.toString());

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });

    if (user && (await (user as any).matchPassword(data.password))) {
      generateToken(res, user._id.toString());
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
      });
    } else {
      next(new ErrorResponse("Invalid credentials", 401));
    }
  } catch (error) {
    next(error);
  }
};

export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById((req as any).user.id).select("-password");
    if (!user) return next(new ErrorResponse("User not found", 404));

    res.status(200).json({ success: true, message: "Profile fetched", data: user });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out successfully", data: null });
};
