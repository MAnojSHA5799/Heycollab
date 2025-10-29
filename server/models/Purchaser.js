import mongoose from "mongoose";

const purchaserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    role: { type: String, default: "purchaser" },
  },
  { timestamps: true }
);

export default mongoose.model("Purchaser", purchaserSchema);


