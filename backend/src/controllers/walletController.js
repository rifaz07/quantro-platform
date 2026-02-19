import User from "../models/User.js";

/**
 * @desc    Get user wallet balance
 * @route   GET /api/wallet
 * @access  Private
 */
export const getBalance = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ balance: user.balance });
};

/**
 * @desc    Add money to wallet
 * @route   POST /api/wallet/deposit
 * @access  Private
 */
export const depositMoney = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const user = await User.findById(req.user._id);

  user.balance += amount;
  await user.save();

  res.json({ balance: user.balance });
};

/**
 * @desc    Withdraw money
 * @route   POST /api/wallet/withdraw
 * @access  Private
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

  res.json({ balance: user.balance });
};