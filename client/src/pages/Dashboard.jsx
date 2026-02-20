import { useEffect, useState } from "react";
import { getWallet } from "../api/walletApi";
import { getHoldings } from "../api/holdingsApi";
import { getTransactions } from "../api/transactionsApi";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletRes = await getWallet();
        setBalance(walletRes.data.balance);

        const holdingsRes = await getHoldings();
        setHoldings(holdingsRes.data);

        const transactionsRes = await getTransactions();
        setTransactions(transactionsRes.data.data); // paginated response
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Wallet Balance</h2>
      <p>{balance !== null ? balance : "Loading..."}</p>

      <h2>Holdings</h2>
      {holdings.length === 0 ? (
        <p>No holdings</p>
      ) : (
        holdings.map((h) => (
          <div key={h._id}>
            <p>
              {h.symbol} — Qty: {h.quantity} — Avg: {h.averagePrice}
            </p>
          </div>
        ))
      )}

      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions</p>
      ) : (
        transactions.map((t) => (
          <div key={t._id}>
            <p>
              {t.type} — {t.amount} — Balance After: {t.balanceAfter}
            </p>
          </div>
        ))
      )}
    </div>
  );
}