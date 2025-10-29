import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
    name: { type: String, required: true },
    type: { type: String },
    designImage: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    approved: { type: Boolean, default: false },
    createdBy: { type: String, default: "seller" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);


