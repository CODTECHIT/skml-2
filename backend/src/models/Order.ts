import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed", "Refunded"], default: "Pending" },
    orderStatus: { type: String, enum: ["Pending", "Packed", "Shipped", "Delivered", "Cancelled", "Refunded"], default: "Pending" },
    trackingId: { type: String },
    trackingUrl: { type: String },
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    auditHistory: [
      {
        status: { type: String, required: true },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        changedAt: { type: Date, default: Date.now },
        note: { type: String },
      }
    ]
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ trackingId: 1 });

export const Order = mongoose.model("Order", orderSchema);
