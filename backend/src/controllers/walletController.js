import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

/**
 * GET WALLET BALANCE
 */
export const getBalance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ balance: user.balance });

  } catch (error) {
    console.error("Get Balance Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * DEPOSIT MONEY
 */
export const depositFunds = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let { amount } = req.body;
    amount = Number(amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += amount;
    await user.save();

    await Transaction.create({
      user: user._id,
      type: "DEPOSIT",
      direction: "CREDIT",
      amount: amount,
      balanceAfter: user.balance,
      description: "Wallet deposit"
    });

    res.json({
      message: "Deposit successful",
      balance: user.balance,
    });

  } catch (error) {
    console.error("Deposit Error:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * WITHDRAW MONEY
 */
export const withdrawMoney = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let { amount } = req.body;
    amount = Number(amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= amount;
    await user.save();

 
    await Transaction.create({
      user: user._id,
      type: "WITHDRAW",
      direction: "DEBIT",
      amount: amount,
      balanceAfter: user.balance,
      description: "Wallet withdrawal"
    });

    res.json({
      message: "Withdraw successful",
      balance: user.balance,
    });

  } catch (error) {
    console.error("Withdraw Error:", error);
    res.status(500).json({ message: error.message });
  }
};