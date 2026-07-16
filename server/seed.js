require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@sprintflow.ai",
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create admin
    await User.create({
      name: "Admin",
      email: "admin@sprintflow.ai",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log("=================================");
    console.log("Email    : admin@sprintflow.ai");
    console.log("Password : password123");
    console.log("=================================");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();