import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    averagePrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate holding per user per stock
holdingSchema.index({ user: 1, symbol: 1 }, { unique: true });

export default mongoose.model("Holding", holdingSchema);