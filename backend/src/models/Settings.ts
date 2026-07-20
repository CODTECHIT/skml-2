import mongoose from "mongoose";

export interface ISettings extends mongoose.Document {
  storeName: string;
  logoUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  shippingCharge: number;
}

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "skml" },
    logoUrl: { type: String, default: "/image.jpeg" },
    email: { type: String, default: "skmlmobilesylm@gmail.com" },
    phone: { type: String, default: "+91 9014154866" },
    whatsapp: { type: String, default: "6300200986" },
    address: { type: String, default: "Yellamanchili, Anakapalli, Andhra Pradesh" },
    shippingCharge: { type: Number, default: 50 },
  },
  {
    timestamps: true,
  }
);

export const Settings = mongoose.model<ISettings>("Settings", settingsSchema);
