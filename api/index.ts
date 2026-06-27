import dotenv from "dotenv";
dotenv.config();

import app from "../backend/src/app";
import { connectDB } from "../backend/src/config/db";
import { connectCloudinary } from "../backend/src/config/cloudinary";
import { seedAdmin } from "../backend/src/utils/seedAdmin";

console.log("Starting serverless function, initializing services...");
connectDB().then(() => console.log("DB connected successfully")).catch(err => console.error("DB connection error:", err));
connectCloudinary();
seedAdmin();

export default app;
