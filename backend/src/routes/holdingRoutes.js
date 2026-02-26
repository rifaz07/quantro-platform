import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getUserHoldings } from "../controllers/holdingController.js";

const router = express.Router();

router.get("/", protect, getUserHoldings);

export default router;