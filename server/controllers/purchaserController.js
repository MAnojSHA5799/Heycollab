import Purchaser from "../models/Purchaser.js";
import crypto from "crypto";

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

const verifyPassword = async (password, salt, hash) => {
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
  return key.toString("hex") === hash;
};

export const registerPurchaser = async (req, res) => {
  try {
    const { name, email, password, phone, address, city, state, pincode } = req.body;
    const exists = await Purchaser.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });
    const { salt, hash } = await hashPassword(password);
    const purchaser = await Purchaser.create({
      name,
      email,
      passwordSalt: salt,
      passwordHash: hash,
      phone,
      address,
      city,
      state,
      pincode,
    });
    res.status(201).json({ message: "Purchaser registered", purchaserId: purchaser._id });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginPurchaser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const purchaser = await Purchaser.findOne({ email });
    if (!purchaser) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await verifyPassword(password, purchaser.passwordSalt, purchaser.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    res.json({ message: "Login successful", role: "purchaser", purchaserId: purchaser._id });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};


