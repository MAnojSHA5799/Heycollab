import express from "express";
import multer from "multer";
import { addProduct, listProducts, approveProduct, getApprovedProducts, getProductById } from "../controllers/productController.js";
import Product from "../models/Product.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/add", upload.single("designImage"), addProduct);
router.get("/all", listProducts);
router.patch("/:id/approve", approveProduct);
router.get("/approved", getApprovedProducts);
router.get("/:id", getProductById);
router.get("/by-seller/:sellerId", async (req, res) => {
  try {
    const items = await Product.find({ sellerId: req.params.sellerId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;


