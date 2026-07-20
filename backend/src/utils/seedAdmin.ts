import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
      await User.create({
        name: "Admin User",
        email: adminEmail,
        phone: "1234567890",
        password: adminPassword,
        role: "admin",
      });
      console.log("Admin user seeded successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
