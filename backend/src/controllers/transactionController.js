import Transaction from "../models/Transaction.js";

/**
 * @desc    Get user transaction history
 * @route   GET /api/transactions
 * @access  Private
 */
export const getTransactions = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const transactions = await Transaction.find({
    user: req.user._id,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments({
    user: req.user._id,
  });

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalTransactions: total,
    data: transactions,
  });
};