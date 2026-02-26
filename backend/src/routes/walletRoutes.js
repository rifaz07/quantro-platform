import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getBalance,
  depositFunds,
  withdrawMoney,
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/", protect, getBalance);
router.post("/deposit", protect, depositFunds);
router.post("/withdraw", protect, withdrawMoney);

export default router;