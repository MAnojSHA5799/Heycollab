import express from "express";
import { registerCreator, getAllCreators } from "../controllers/creatorController.js";

const router = express.Router();

router.post("/register", registerCreator);
router.get("/all", getAllCreators);

export default router;
