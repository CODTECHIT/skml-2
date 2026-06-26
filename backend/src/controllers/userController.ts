import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await User.find({ role: "customer" }).select("-password").sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers
    });
  } catch (error) {
    next(error);
  }
};
