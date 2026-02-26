import API from "./apiClient";

export const getHoldings = () => {
  return API.get("/holdings");
};