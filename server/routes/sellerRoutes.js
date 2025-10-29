import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { registerSeller, loginSeller, approveSeller, getSellerById } from "../controllers/sellerController.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
    { name: "pancard", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "registrationCert", maxCount: 1 },
    { name: "cancelledCheque", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  registerSeller
);

export default router;

// Auth and approvals
router.post("/login", loginSeller);
router.patch("/:id/approve", approveSeller);
router.get(":id", getSellerById);
