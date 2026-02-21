import { useEffect, useState } from "react";
import { getWallet } from "../api/walletApi";
import { getHoldings } from "../api/holdingsApi";
import { getTransactions } from "../api/transactionsApi";
import OrderForm from "../components/trading/OrderForm";
import WalletCard from "../components/wallet/walletCard";

// Currency formatter
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const walletRes = await getWallet();
      setBalance(walletRes.data.balance);

      const holdingsRes = await getHoldings();
      setHoldings(holdingsRes.data);

      const transactionsRes = await getTransactions();
      const txData = transactionsRes.data.data || [];

      // Sort newest first
      txData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTransactions(txData);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* ORDER FORM */}
      <OrderForm onOrderSuccess={fetchDashboardData} />

      <hr />

      {/* WALLET */}
      <WalletCard
        balance={balance !== null ? formatCurrency(balance) : null}
        loading={loading}
        onRefresh={fetchDashboardData}
      />

      <hr />

      {/* HOLDINGS */}
      <h2>Holdings</h2>
      {holdings.length === 0 ? (
        <p>No holdings</p>
      ) : (
        holdings.map((h) => (
          <div key={h._id}>
            <p>
              {h.symbol} — Qty: {h.quantity} — Avg:{" "}
              {formatCurrency(h.averagePrice)}
            </p>
          </div>
        ))
      )}

      <hr />

      {/* TRANSACTIONS */}
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions</p>
      ) : (
        transactions.map((t) => (
          <div key={t._id}>
            <p>
              {t.type} — {formatCurrency(t.amount)} — Balance After:{" "}
              {formatCurrency(t.balanceAfter)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}