import API from "./axios";

export const getWallet = () => {
  return API.get("/wallet");
};