import { useEffect, useState } from "react";
import { getWallet } from "../api/walletApi";
import { getHoldings } from "../api/holdingsApi";
import { getTransactions } from "../api/transactionsApi";
import OrderForm from "../components/trading/OrderForm";
import WalletCard from "../components/wallet/walletCard";

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
      setTransactions(transactionsRes.data.data || []);
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

      {/* WALLET COMPONENT */}
      <WalletCard
        balance={balance}
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
              {Number(h.averagePrice).toFixed(2)}
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
              {t.type} — {t.amount} — Balance After: {t.balanceAfter}
            </p>
          </div>
        ))
      )}
    </div>
  );
}