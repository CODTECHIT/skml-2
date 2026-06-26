import { Request, Response, NextFunction } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { ErrorResponse } from "../utils/errorResponse";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;
    if (!amount) return next(new ErrorResponse("Amount is required", 400));

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Fallback
      return res.status(200).json({ success: true, message: "COD Fallback Mode", data: { fallback: true } });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, message: "Order created", data: order });
  } catch (error: any) {
    next(new ErrorResponse(error.message, 500));
  }
};

export const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return next(new ErrorResponse("Razorpay secret not configured", 500));
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ success: true, message: "Payment verified successfully", data: { verified: true } });
    } else {
      return next(new ErrorResponse("Invalid payment signature", 400));
    }
  } catch (error: any) {
    next(new ErrorResponse(error.message, 500));
  }
};
