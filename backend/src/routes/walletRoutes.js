import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getBalance,
  depositMoney,
  withdrawMoney,
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/", protect, getBalance);
router.post("/deposit", protect, depositMoney);
router.post("/withdraw", protect, withdrawMoney);

export default router;