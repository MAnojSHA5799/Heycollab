import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    instagramLink: { type: String, required: true },
    youtubeLink: { type: String },
    facebookLink: { type: String },
    telegramLink: { type: String },
    followers: { type: String },
    whatsapp: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    nicheCategory: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    followerCount: { type: String },
    followedLinks: { type: [String], default: [] },
    approved: { type: Boolean, default: false },
    role: { type: String, default: "creator" },
  },
  { timestamps: true }
);

const Creator = mongoose.model("Creator", creatorSchema);

export default Creator;
