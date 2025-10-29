import Admin from "../models/Admin.js";
import crypto from "crypto";
import Seller from "../models/Seller.js";
import Creator from "../models/Creator.js";
import Product from "../models/Product.js";

const verifyPassword = async (password, salt, hash) => {
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
  return key.toString("hex") === hash;
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await verifyPassword(password, admin.passwordSalt, admin.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", role: "admin" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const listAll = async (_req, res) => {
  try {
    const [sellers, creators, products] = await Promise.all([
      Seller.find().sort({ createdAt: -1 }),
      Creator.find().sort({ createdAt: -1 }),
      Product.find().sort({ createdAt: -1 }),
    ]);
    res.json({ sellers, creators, products });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};


