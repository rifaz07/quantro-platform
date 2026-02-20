import API from "./axios";

export const getHoldings = () => {
  return API.get("/holdings");
};