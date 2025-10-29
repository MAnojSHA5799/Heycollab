import Creator from "../models/Creator.js";
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

// Register new creator
export const registerCreator = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      instagramLink,
      youtubeLink,
      facebookLink,
      telegramLink,
      followers,
      whatsapp,
      gender,
      age,
      nicheCategory,
      state,
      city,
      pincode,
      followerCount,
      followedLinks,
    } = req.body;

    // Check if email already registered
    const existing = await Creator.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Creator already registered with this email." });
    }

    const { salt, hash } = await hashPassword(password);

    const creator = new Creator({
      name,
      email,
      passwordHash: hash,
      passwordSalt: salt,
      instagramLink,
      youtubeLink,
      facebookLink,
      telegramLink,
      followers,
      whatsapp,
      gender,
      age,
      nicheCategory,
      state,
      city,
      pincode,
      followerCount,
      followedLinks,
    });

    await creator.save();
    res.status(201).json({ message: "Creator registered successfully! Pending admin approval.", creatorId: creator._id });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all creators
export const getAllCreators = async (req, res) => {
  try {
    const creators = await Creator.find().sort({ createdAt: -1 });
    res.status(200).json(creators);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch creators" });
  }
};

export const getCreatorById = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = await Creator.findById(id);
    if (!creator) return res.status(404).json({ error: "Creator not found" });
    res.json(creator);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginCreator = async (req, res) => {
  try {
    const { email, password } = req.body;
    const creator = await Creator.findOne({ email });
    if (!creator) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await verifyPassword(password, creator.passwordSalt, creator.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    if (!creator.approved) return res.status(403).json({ error: "Pending admin approval" });

    res.json({ message: "Login successful", role: "creator", creatorId: creator._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveCreator = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Creator.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!updated) return res.status(404).json({ error: "Creator not found" });
    res.json({ message: "Creator approved", creatorId: updated._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
