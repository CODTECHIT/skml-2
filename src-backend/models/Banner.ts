import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    tag: { type: String },
    type: { type: String, enum: ["hero", "promo"], default: "hero" },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Banner = mongoose.model("Banner", bannerSchema);

