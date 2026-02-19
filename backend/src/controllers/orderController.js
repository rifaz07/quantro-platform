import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  const { symbol, quantity, price, type } = req.body;

  if (!symbol || !quantity || !price || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const totalAmount = quantity * price;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(req.user._id).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    if (type === "BUY") {
      if (user.balance < totalAmount) {
        throw new Error("Insufficient balance");
      }

      user.balance -= totalAmount;
    }

    await user.save({ session });

    const order = await Order.create(
      [
        {
          user: user._id,
          symbol,
          quantity,
          price,
          totalAmount,
          type,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order placed successfully",
      order: order[0],
      balance: user.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ message: error.message });
  }
};