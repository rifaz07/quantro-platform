import Holding from "../models/Holding.js";

/**
 * @desc    Get user holdings
 * @route   GET /api/holdings
 * @access  Private
 */
export const getUserHoldings = async (req, res) => {
  const holdings = await Holding.find({ user: req.user._id });

  res.json(holdings);
};