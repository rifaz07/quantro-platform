import { executeOrder } from "../services/orderService.js";

export const placeOrder = async (req, res) => {
  const { symbol, quantity, price, type } = req.body;

  if (!symbol || !quantity || !price || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const result = await executeOrder({
      userId: req.user._id,
      symbol,
      quantity,
      price,
      type,
    });

    res.status(201).json({
      message: "Order placed successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};