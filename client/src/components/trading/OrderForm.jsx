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

  //THIS IS THE IMPORTANT PART
  useEffect(() => {
    if (selectedSymbol) {
      setFormData((prev) => ({
        ...prev,
        symbol: selectedSymbol,
      }));
    }
  }, [selectedSymbol]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      setFormData({
        symbol: "",
        quantity: "",
        price: "",
        type: "BUY",
      });

      onOrderSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Place Order
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <input
          type="text"
          name="symbol"
          placeholder="Symbol"
          value={formData.symbol}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`rounded-lg px-3 py-2 font-semibold text-white ${
            formData.type === "BUY"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          {submitting ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-3 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}