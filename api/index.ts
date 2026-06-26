import app from "../src-backend/app";
import { connectDB } from "../src-backend/config/db";
import { connectCloudinary } from "../src-backend/config/cloudinary";

// Ensure database and Cloudinary are initialized once per cold start
connectDB();
connectCloudinary();

export default app;
