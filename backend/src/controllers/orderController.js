import { executeOrder } from "../services/orderService.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { symbol, quantity, price, type } = req.body;

    //validation
    if (!symbol || !quantity || !price || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert numeric fields 
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    // Validate numbers
    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Quantity and price must be numbers" });
    }

    if (parsedQuantity <= 0 || parsedPrice <= 0) {
      return res.status(400).json({ message: "Quantity and price must be greater than 0" });
    }

    // Validate order type
    const normalizedType = type.toUpperCase();
    if (!["BUY", "SELL"].includes(normalizedType)) {
      return res.status(400).json({ message: "Invalid order type" });
    }

    // Execute order via service
    const result = await executeOrder({
      userId: req.user._id,
      symbol: symbol.toUpperCase(),
      quantity: parsedQuantity,
      price: parsedPrice,
      type: normalizedType,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      ...result,
    });

  } catch (error) {
    next(error);
  }
};