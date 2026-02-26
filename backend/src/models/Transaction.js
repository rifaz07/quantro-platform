import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAW", "BUY", "SELL"],
      required: true,
    },

    direction: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },

    reference: {
      type: String,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Compound index for performance
transactionSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Transaction", transactionSchema);