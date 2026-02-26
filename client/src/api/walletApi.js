import API from "./apiClient";

export const getWallet = () => API.get("/wallet");

export const depositMoney = (data) =>
  API.post("/wallet/deposit", data);

export const withdrawMoney = (data) =>
  API.post("/wallet/withdraw", data);