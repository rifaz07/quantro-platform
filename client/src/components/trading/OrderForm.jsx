import { useState } from "react";
import { placeOrder } from "../../api/orderApi";

export default function OrderForm({ onOrderSuccess }) {
  const [formData, setFormData] = useState({
    symbol: "",
    quantity: "",
    price: "",
    type: "BUY",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      <h2>Place Order</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="symbol"
          placeholder="Symbol"
          value={formData.symbol}
          onChange={handleChange}
          disabled={submitting}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          disabled={submitting}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          disabled={submitting}
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={submitting}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <button type="submit" disabled={submitting}>
          {submitting ? "Processing..." : "Submit Order"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}