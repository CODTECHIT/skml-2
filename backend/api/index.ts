import app from "../src/app";
import { connectDB } from "../src/config/db";
import { connectCloudinary } from "../src/config/cloudinary";

// Ensure database and Cloudinary are initialized once per cold start
connectDB();
connectCloudinary();

export default app;
