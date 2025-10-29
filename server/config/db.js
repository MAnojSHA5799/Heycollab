// const mongoose = require("mongoose")

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//         console.log("Mongo DB Connected: ", conn.connection.host)
//     }
//     catch(err) {
//         console.log(err)
//         process.exit(1)
//     }
// }

// module.exports = connectDB

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://manojshakya54:VV2F0ZbarJSRpstc@cluster0.htdtk.mongodb.net/heycollab", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
