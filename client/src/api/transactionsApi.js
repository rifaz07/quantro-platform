import API from "./apiClient";

export const getTransactions = () => {
  return API.get("/transactions");
};