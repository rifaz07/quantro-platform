import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Holding from "../models/Holding.js";
import Transaction from "../models/Transaction.js";

export const executeOrder = async ({
  userId,
  symbol,
  quantity,
  price,
  type,
}) => {
  //INPUT VALIDATION

  if (!symbol || !quantity || !price || !type) {
    throw new Error("Missing order fields");
  }

  quantity = Number(quantity);
  price = Number(price);

  if (quantity <= 0 || price <= 0) {
    throw new Error("Invalid quantity or price");
  }

  if (!["BUY", "SELL"].includes(type)) {
    throw new Error("Invalid order type");
  }

  const totalAmount = quantity * price;

  const session = await mongoose.startSession();

  try {
    let result;

    await session.withTransaction(async () => {
      const user = await User.findById(userId).session(session);
      if (!user) throw new Error("User not found");

      let holding = await Holding.findOne({
        user: user._id,
        symbol,
      }).session(session);

      //BUY
      if (type === "BUY") {
        if (user.balance < totalAmount) {
          throw new Error("Insufficient balance");
        }

        user.balance -= totalAmount;

        // Ledger entry (DEBIT)
        await Transaction.create(
          [
            {
              user: user._id,
              type: "BUY",
              direction: "DEBIT",
              amount: totalAmount,
              balanceAfter: user.balance,
              reference: symbol,
              description: `Bought ${quantity} ${symbol}`,
            },
          ],
          { session }
        );

        if (!holding) {
          holding = new Holding({
            user: user._id,
            symbol,
            quantity,
            averagePrice: price,
          });
        } else {
          const totalCost =
            holding.quantity * holding.averagePrice + totalAmount;

          const newQuantity = holding.quantity + quantity;

          holding.averagePrice = totalCost / newQuantity;
          holding.quantity = newQuantity;
        }

        await holding.save({ session });
      }

      // SELL 
      if (type === "SELL") {
        if (!holding || holding.quantity < quantity) {
          throw new Error("Insufficient holdings");
        }

        holding.quantity -= quantity;
        user.balance += totalAmount;

        // Ledger entry (CREDIT)
        await Transaction.create(
          [
            {
              user: user._id,
              type: "SELL",
              direction: "CREDIT",
              amount: totalAmount,
              balanceAfter: user.balance,
              reference: symbol,
              description: `Sold ${quantity} ${symbol}`,
            },
          ],
          { session }
        );

        if (holding.quantity === 0) {
          await holding.deleteOne({ session });
        } else {
          await holding.save({ session });
        }
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
            status: "EXECUTED",
          },
        ],
        { session }
      );

      result = {
        order: order[0],
        balance: user.balance,
      };
    });

    return result;
  } finally {
    session.endSession();
  }
};