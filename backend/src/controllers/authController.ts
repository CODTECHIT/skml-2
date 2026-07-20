import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { generateToken, generateRefreshToken, clearTokens } from "../utils/generateToken";
import { ErrorResponse } from "../utils/errorResponse";
import { z } from "zod";
import { sendPasswordReset } from "../services/emailService";
import crypto from "crypto";

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

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
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
    await generateRefreshToken(res, user._id.toString());

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

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    if ((user as any).isLocked()) {
      const remainingMs = (user as any).lockUntil - Date.now();
      const remainingMin = Math.ceil(remainingMs / 60000);
      return next(new ErrorResponse(`Account locked. Try again in ${remainingMin} minute(s)`, 423));
    }

    if (await (user as any).matchPassword(data.password)) {
      await (user as any).resetLoginAttempts();
      generateToken(res, user._id.toString());
      await generateRefreshToken(res, user._id.toString());
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
      });
    } else {
      await (user as any).incrementLoginAttempts();
      const attemptsLeft = 5 - (user.loginAttempts || 0);
      const msg = attemptsLeft > 0
        ? `Invalid credentials. ${attemptsLeft} attempt(s) remaining`
        : "Invalid credentials. Account locked for 30 minutes";
      return next(new ErrorResponse(msg, 401));
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

export const logout = async (req: Request, res: Response) => {
  const userId = (req as any).user?._id;
  if (userId) {
    await User.findByIdAndUpdate(userId, {
      refreshToken: undefined,
      refreshTokenExpire: undefined,
    });
  }
  clearTokens(res);
  res.status(200).json({ success: true, message: "Logged out successfully", data: null });
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = forgotPasswordSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const resetToken = (user as any).getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
      await sendPasswordReset(user.email, resetUrl);
      res.status(200).json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (error) {
      (user as any).resetPasswordToken = undefined;
      (user as any).resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid or expired token", 400));
    }

    const data = resetPasswordSchema.parse(req.body);
    user.password = data.password;
    (user as any).resetPasswordToken = undefined;
    (user as any).resetPasswordExpire = undefined;
    await user.save();

    generateToken(res, user._id.toString());
    await generateRefreshToken(res, user._id.toString());
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return next(new ErrorResponse("No refresh token", 401));
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as any;
    if (decoded.type !== "refresh") {
      return next(new ErrorResponse("Invalid refresh token", 401));
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== hashedToken) {
      // Token reuse detected — revoke all tokens for this user
      await User.findByIdAndUpdate(decoded.id, {
        refreshToken: undefined,
        refreshTokenExpire: undefined,
      });
      clearTokens(res);
      return next(new ErrorResponse("Refresh token revoked", 401));
    }

    if (user.refreshTokenExpire && user.refreshTokenExpire < new Date()) {
      return next(new ErrorResponse("Refresh token expired", 401));
    }

    generateToken(res, user._id.toString());
    await generateRefreshToken(res, user._id.toString());

    res.status(200).json({
      success: true,
      message: "Tokens refreshed",
      data: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    return next(new ErrorResponse("Invalid refresh token", 401));
  }
};
