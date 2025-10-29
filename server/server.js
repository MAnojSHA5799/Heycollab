// const express = require("express")
// const app = express()
// const cors = require("cors")
// require("dotenv").config()
// const connectDB = require("./config/db")
// const PORT = process.env.PORT || 8000

// // middlewares
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(express.static("public"));

// // connect to the mongodb database
// /* connectDB() */

// app.use('/api/items', require("./routes/items"))
// app.use('/api/payment', cors(), require("./routes/payment"))

// app.listen(PORT, console.log("Server is running on port ", PORT))


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Admin from "./models/Admin.js";
import Seller from "./models/Seller.js";
import Creator from "./models/Creator.js";
import crypto from "crypto";
import purchaserRoutes from "./routes/purchaserRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import Purchaser from "./models/Purchaser.js";

dotenv.config();
const app = express();

// ✅ Connect to database first
connectDB();

// ✅ CORS setup (important part)
const corsOptions = {
  // origin: "http://localhost:3000", // your frontend URL
  origin: "https://heycollab.vercel.app", // your frontend URL 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, // allow cookies/auth headers
};

app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/creators", creatorRoutes);
// ✅ Routes
app.use("/api/sellers", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/purchasers", purchaserRoutes);
app.use("/api/products", productRoutes);

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Seed default admin, seller, creator for quick login testing (idempotent)
(async function seedDefaults() {
  try {
    const hashPassword = async (password) => {
      const salt = crypto.randomBytes(16).toString("hex");
      const derivedKey = await new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, key) => {
          if (err) reject(err);
          else resolve(key);
        });
      });
      return { salt, hash: derivedKey.toString("hex") };
    };

    // Admin
    if (!(await Admin.findOne({ email: "admin@heycollab.com" }))) {
      const { salt, hash } = await hashPassword("Admin@123");
      await Admin.create({ email: "admin@heycollab.com", passwordSalt: salt, passwordHash: hash });
      console.log("✅ Seeded admin: admin@heycollab.com / Admin@123");
    }

    // Seller
    if (!(await Seller.findOne({ businessEmail: "seller@test.com" }))) {
      const { salt, hash } = await hashPassword("Pass@123");
      await Seller.create({
        businessEmail: "seller@test.com",
        ownerName: "Seed Seller",
        storeName: "Seed Store",
        passwordSalt: salt,
        passwordHash: hash,
        approved: true,
      });
      console.log("✅ Seeded seller: seller@test.com / Pass@123 (approved)");
    }

    // Creator
    if (!(await Creator.findOne({ email: "creator@test.com" }))) {
      const { salt, hash } = await hashPassword("Pass@123");
      await Creator.create({
        name: "Seed Creator",
        email: "creator@test.com",
        passwordSalt: salt,
        passwordHash: hash,
        instagramLink: "https://instagram.com/seed",
        youtubeLink: "",
        facebookLink: "",
        telegramLink: "",
        followers: "1000",
        whatsapp: "+911234567890",
        gender: "Male",
        age: 25,
        nicheCategory: "Fashion",
        state: "DL",
        city: "Delhi",
        pincode: "110001",
        followerCount: "1000",
        followedLinks: [],
        approved: true,
      });
      console.log("✅ Seeded creator: creator@test.com / Pass@123 (approved)");
    }

    // Purchaser
    if (!(await Purchaser.findOne({ email: "buyer@test.com" }))) {
      const { salt, hash } = await hashPassword("Pass@123");
      await Purchaser.create({
        name: "Seed Buyer",
        email: "buyer@test.com",
        passwordSalt: salt,
        passwordHash: hash,
        phone: "+911111111111",
        city: "Delhi",
        state: "DL",
        pincode: "110001",
      });
      console.log("✅ Seeded purchaser: buyer@test.com / Pass@123");
    }
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  }
})();

