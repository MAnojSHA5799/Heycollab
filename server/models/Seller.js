import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    // 🧾 Step 1: Business & Store Details
    storeName: String,
    businessType: String,
    category: String,
    description: String,
    dateOfEstablishment: Date,
    gstNumber: String,
    panNumber: String,
    fssaiNumber: String,
    website: String,
    logo: String,
    productCount: Number,
    monthlyOrders: Number,
    businessModel: String,

    // 👤 Step 2: Contact & Pickup Address
    ownerName: String,
    businessEmail: String,
    mobile: String,
    altContact: String,
    address1: String,
    address2: String,
    country: String,
    state: String,
    city: String,
    pincode: String,
    hasReturnAddress: Boolean,
    returnAddress1: String,
    returnAddress2: String,
    businessHours: String,
    supportContact: String,

    // 💳 Step 3: Documents & Payment Info
    aadhaar: String,
    pancard: String,
    gstCertificate: String,
    registrationCert: String,
    cancelledCheque: String,
    bankName: String,
    accountHolder: String,
    accountNumber: String,
    ifsc: String,
    branchName: String,
    upi: String,
    paymentCycle: String,
    signature: String,
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
