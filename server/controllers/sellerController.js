import Seller from "../models/Seller.js";
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

export const registerSeller = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    // ✅ Map uploaded files
    if (files) {
      data.logo = files.logo?.[0]?.path;
      data.aadhaar = files.aadhaar?.[0]?.path;
      data.pancard = files.pancard?.[0]?.path;
      data.gstCertificate = files.gstCertificate?.[0]?.path;
      data.registrationCert = files.registrationCert?.[0]?.path;
      data.cancelledCheque = files.cancelledCheque?.[0]?.path;
      data.signature = files.signature?.[0]?.path;
    }

    // Uniqueness on businessEmail
    if (data.businessEmail) {
      const exists = await Seller.findOne({ businessEmail: data.businessEmail });
      if (exists) {
        return res.status(400).json({ error: "Seller already registered with this email" });
      }
    }

    if (!data.password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const { salt, hash } = await hashPassword(data.password);
    data.passwordSalt = salt;
    data.passwordHash = hash;
    delete data.password;

    const seller = new Seller(data);
    await seller.save();

    res.status(201).json({
      message: "✅ Seller registered successfully! Pending admin approval.",
      sellerId: seller._id,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Server error while registering seller" });
  }
};

export const loginSeller = async (req, res) => {
  try {
    const { businessEmail, password } = req.body;
    const seller = await Seller.findOne({ businessEmail });
    if (!seller) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await verifyPassword(password, seller.passwordSalt, seller.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    if (!seller.approved) return res.status(403).json({ error: "Pending admin approval" });

    res.json({ message: "Login successful", role: "seller", sellerId: seller._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Seller.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!updated) return res.status(404).json({ error: "Seller not found" });
    res.json({ message: "Seller approved", sellerId: updated._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    res.json(seller);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
