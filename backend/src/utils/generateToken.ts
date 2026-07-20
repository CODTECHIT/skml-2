import jwt from "jsonwebtoken";
import { Response } from "express";
import crypto from "crypto";
import { User } from "../models/User";

export const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000,
  });
};

export const generateRefreshToken = async (res: Response, userId: string) => {
  const refreshToken = jwt.sign(
    { id: userId, type: "refresh" },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await User.findByIdAndUpdate(userId, {
    refreshToken: hashedToken,
    refreshTokenExpire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearTokens = (res: Response) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });
};
