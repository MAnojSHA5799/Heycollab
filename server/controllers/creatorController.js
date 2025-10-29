import Creator from "../models/Creator.js";

// Register new creator
export const registerCreator = async (req, res) => {
  try {
    const {
      name,
      email,
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

    const creator = new Creator({
      name,
      email,
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
    res.status(201).json({ message: "Creator registered successfully!", creator });
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
