import express from "express";
import { registerCreator, getAllCreators, loginCreator, approveCreator, getCreatorById } from "../controllers/creatorController.js";

const router = express.Router();

router.post("/register", registerCreator);
router.get("/all", getAllCreators);
router.get(":id", getCreatorById);
router.post("/login", loginCreator);
router.patch("/:id/approve", approveCreator);

export default router;
