import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

/*
    @desc    Get Wallet Balance
    @route   GET /api/wallet
    @access  Private
*/
export const getWallet = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    balance: user.balance,
  });
};

/*
    @desc    Deposit Money
    @route   POST /api/wallet/deposit
    @access  Private
*/
export const depositMoney = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const user = await User.findById(req.user._id);

  user.balance += amount;
  await user.save();

  await Transaction.create({
    user: user._id,
    type: "DEPOSIT",
    amount,
    balanceAfter: user.balance,
  });

  res.json({ balance: user.balance });
};

/*
    @desc    Withdraw Money
    @route   POST /api/wallet/withdraw
    @access  Private
*/
export const withdrawMoney = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const user = await User.findById(req.user._id);

  if (user.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  user.balance -= amount;
  await user.save();

  await Transaction.create({
    user: user._id,
    type: "WITHDRAW",
    amount,
    balanceAfter: user.balance,
  });

  res.json({ balance: user.balance });
};