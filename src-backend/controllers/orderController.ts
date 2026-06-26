import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order";
import { ErrorResponse } from "../utils/errorResponse";
import { z } from "zod";

const orderSchema = z.object({
  products: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })).min(1),
  total: z.number().min(0),
  paymentMethod: z.enum(["COD", "Online"]),
  address: z.object({
    fullName: z.string(),
    phone: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  })
});

const updateOrderSchema = z.object({
  orderStatus: z.enum(["Pending", "Packed", "Shipped", "Delivered"]).optional(),
  trackingId: z.string().optional(),
  trackingUrl: z.string().optional(),
});

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orders;
    if ((req as any).user.role === "admin") {
      orders = await Order.find({}).populate("userId", "name email").sort("-createdAt");
    } else {
      orders = await Order.find({ userId: (req as any).user._id }).sort("-createdAt");
    }
    res.status(200).json({ success: true, message: "Orders fetched", data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId", "name email");
    if (!order) return next(new ErrorResponse("Order not found", 404));
    
    if ((req as any).user.role !== "admin" && order.userId._id.toString() !== (req as any).user._id.toString()) {
      return next(new ErrorResponse("Not authorized to view this order", 403));
    }

    res.status(200).json({ success: true, message: "Order fetched", data: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = orderSchema.parse(req.body);
    const order = await Order.create({
      ...data,
      userId: (req as any).user._id,
      paymentStatus: data.paymentMethod === "COD" ? "Pending" : "Paid"
    });
    res.status(201).json({ success: true, message: "Order created", data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = updateOrderSchema.parse(req.body);
    const order = await Order.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!order) return next(new ErrorResponse("Order not found", 404));
    res.status(200).json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};
