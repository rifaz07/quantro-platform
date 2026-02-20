import API from "./axios";

export const getTransactions = () => {
  return API.get("/transactions");
};