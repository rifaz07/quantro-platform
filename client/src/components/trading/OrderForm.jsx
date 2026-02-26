import { useState, useEffect } from "react";
import { placeOrder } from "../../api/orderApi";

export default function OrderForm({ selectedSymbol, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    symbol: "",
    quantity: "",
    price: "",
    type: "BUY",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedSymbol) {
      setFormData((prev) => ({ ...prev, symbol: selectedSymbol }));
    }
  }, [selectedSymbol]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.symbol || !formData.quantity || !formData.price) {
      setError("All fields are required");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await placeOrder({
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      setFormData({ symbol: "", quantity: "", price: "", type: "BUY" });
      onOrderSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  const totalCost =
    formData.quantity && formData.price
      ? Number(formData.quantity) * Number(formData.price)
      : null;

  const isBuy = formData.type === "BUY";

  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Place Order</h2>

      {/* BUY / SELL Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, type: "BUY" })}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
            isBuy
              ? "bg-white text-green-600 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          ▲ BUY
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, type: "SELL" })}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
            !isBuy
              ? "bg-white text-red-500 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          ▼ SELL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        {/* Symbol */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Symbol
          </label>
          <input
            type="text"
            name="symbol"
            placeholder="e.g. BTCUSD"
            value={formData.symbol}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-400 transition"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="0"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-400 transition font-mono"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-400 transition font-mono"
          />
        </div>

        {/* Total Cost */}
        {totalCost !== null && (
          <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Total Cost
            </span>
            <span className="text-sm font-bold text-gray-900 font-mono">
              ₹{totalCost.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs font-medium">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2.5 rounded-lg text-sm font-bold text-white transition disabled:opacity-60 ${
            isBuy
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {submitting ? "Processing..." : `Place ${isBuy ? "BUY" : "SELL"} Order`}
        </button>

      </form>
    </div>
  );
}