import api from "./api";

export const getWallet = () => api.get("/wallet");

export const depositMoney = (data) =>
  api.post("/wallet/deposit", data);

export const withdrawMoney = (data) =>
  api.post("/wallet/withdraw", data);