import API from "./apiClient";

export const placeOrder = (orderData) => {
  return API.post("/orders", orderData);
};