import express from "express";
import { loginAdmin, listAll } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/all", listAll);

export default router;


