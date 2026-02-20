import { useState } from "react";
import { placeOrder } from "../../api/orderApi";

export default function OrderForm({ onOrderSuccess }) {
  const [orderData, setOrderData] = useState({
    symbol: "",
    quantity: "",
    price: "",
    type: "BUY",
  });

  const handleOrderChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      await placeOrder({
        ...orderData,
        quantity: Number(orderData.quantity),
        price: Number(orderData.price),
      });

      alert("Order placed successfully");

      if (onOrderSuccess) {
        onOrderSuccess();
      }

      setOrderData({
        symbol: "",
        quantity: "",
        price: "",
        type: "BUY",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <>
      <h2>Place Order</h2>
      <form onSubmit={handlePlaceOrder}>
        <input
          type="text"
          name="symbol"
          placeholder="Symbol (AAPL)"
          value={orderData.symbol}
          onChange={handleOrderChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={orderData.quantity}
          onChange={handleOrderChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={orderData.price}
          onChange={handleOrderChange}
        />

        <select
          name="type"
          value={orderData.type}
          onChange={handleOrderChange}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <button type="submit">Submit Order</button>
      </form>
    </>
  );
}