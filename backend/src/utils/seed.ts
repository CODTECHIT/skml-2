import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Banner } from "../models/Banner";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB...");

    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Banner.deleteMany();

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      phone: "1234567890",
      password: "Admin@123", // Will be hashed by pre-save hook
      role: "admin",
    });

    await Category.insertMany([
      { name: "Smartphones", status: "Active", image: "https://placehold.co/100x100" },
      { name: "Laptops", status: "Active", image: "https://placehold.co/100x100" },
      { name: "Accessories", status: "Active", image: "https://placehold.co/100x100" },
      { name: "Tablets", status: "Active", image: "https://placehold.co/100x100" },
      { name: "Wearables", status: "Active", image: "https://placehold.co/100x100" },
    ]);

    await Product.insertMany([
      { title: "iPhone 15 Pro", description: "Apple iPhone 15 Pro 256GB", category: "Smartphones", price: 134900, discountPrice: 129900, stock: 50, images: ["https://placehold.co/400x400"], rating: 4.8 },
      { title: "Samsung Galaxy S24 Ultra", description: "Samsung Galaxy S24 Ultra 512GB", category: "Smartphones", price: 129999, discountPrice: 124999, stock: 30, images: ["https://placehold.co/400x400"], rating: 4.7 },
      { title: "MacBook Pro M3", description: "Apple MacBook Pro M3 Chip 14-inch", category: "Laptops", price: 169900, discountPrice: 159900, stock: 20, images: ["https://placehold.co/400x400"], rating: 4.9 },
      { title: "Sony WH-1000XM5", description: "Wireless Noise Cancelling Headphones", category: "Accessories", price: 29990, discountPrice: 24990, stock: 100, images: ["https://placehold.co/400x400"], rating: 4.6 },
      { title: "Apple Watch Series 9", description: "GPS + Cellular 45mm", category: "Wearables", price: 44900, discountPrice: 41900, stock: 45, images: ["https://placehold.co/400x400"], rating: 4.7 },
      { title: "iPad Air 5th Gen", description: "Apple iPad Air 64GB Wi-Fi", category: "Tablets", price: 59900, discountPrice: 54900, stock: 60, images: ["https://placehold.co/400x400"], rating: 4.8 },
      { title: "AirPods Pro 2", description: "Apple AirPods Pro 2nd Gen", category: "Accessories", price: 24900, discountPrice: 22900, stock: 120, images: ["https://placehold.co/400x400"], rating: 4.8 },
      { title: "Samsung Galaxy Watch 6", description: "Classic 47mm LTE", category: "Wearables", price: 34999, discountPrice: 31999, stock: 40, images: ["https://placehold.co/400x400"], rating: 4.5 },
      { title: "Dell XPS 15", description: "Dell XPS 15 Laptop i7 13th Gen", category: "Laptops", price: 189990, discountPrice: 179990, stock: 15, images: ["https://placehold.co/400x400"], rating: 4.7 },
      { title: "OnePlus 12", description: "OnePlus 12 5G 16GB RAM 512GB", category: "Smartphones", price: 69999, discountPrice: 64999, stock: 80, images: ["https://placehold.co/400x400"], rating: 4.6 },
    ]);

    await Banner.insertMany([
      { title: "iPhone 15 Series", image: "https://placehold.co/1200x400", redirectUrl: "/products", status: "Active" },
      { title: "Samsung Fest", image: "https://placehold.co/1200x400", redirectUrl: "/products", status: "Active" },
      { title: "Laptop Mega Sale", image: "https://placehold.co/1200x400", redirectUrl: "/products", status: "Active" },
    ]);

    console.log("Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
