import API from "./axios";

export const placeOrder = (orderData) => {
  return API.post("/orders", orderData);
};