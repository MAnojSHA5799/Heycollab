import express from "express";
import { registerPurchaser, loginPurchaser } from "../controllers/purchaserController.js";

const router = express.Router();

router.post("/register", registerPurchaser);
router.post("/login", loginPurchaser);

export default router;


