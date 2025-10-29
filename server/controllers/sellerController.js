import Seller from "../models/Seller.js";

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

    const seller = new Seller(data);
    await seller.save();

    res.status(201).json({
      message: "✅ Seller registered successfully!",
      seller,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Server error while registering seller" });
  }
};
