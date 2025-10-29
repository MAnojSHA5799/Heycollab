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

dotenv.config();
const app = express();

// ✅ Connect to database first
connectDB();

// ✅ CORS setup (important part)
const corsOptions = {
  origin: "http://localhost:3000", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
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

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

