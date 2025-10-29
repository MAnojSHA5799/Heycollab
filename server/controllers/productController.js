import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { sellerId, name, type, price, description } = req.body;
    const designImage = req.file?.path;
    if (!sellerId || !name || !price) return res.status(400).json({ error: "Missing required fields" });
    const product = await Product.create({ sellerId, name, type, price, description, designImage, approved: false });
    res.status(201).json({ message: "Product submitted for approval", productId: product._id });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const listProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product approved", productId: updated._id });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getApprovedProducts = async (_req, res) => {
  try {
    const products = await Product.find({ approved: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};


