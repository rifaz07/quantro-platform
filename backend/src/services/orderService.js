import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const executeOrder = async ({ userId, symbol, quantity, price, type }) => {
  const totalAmount = quantity * price;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);

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

    return {
      order: order[0],
      balance: user.balance,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};