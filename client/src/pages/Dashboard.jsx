import { useEffect, useState } from "react";
import { getWallet } from "../api/walletApi";
import { getHoldings } from "../api/holdingsApi";
import { getTransactions } from "../api/transactionsApi";
import OrderForm from "../components/trading/OrderForm";
import Watchlist from "../components/trading/Watchlist";
import WalletCard from "../components/wallet/WalletCard";
import DashboardNavbar from "../components/layout/DashboardNavbar";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const fetchDashboardData = async () => {
    try {
      const walletRes = await getWallet();
      setBalance(walletRes.data.balance);

      const holdingsRes = await getHoldings();
      setHoldings(holdingsRes.data);

      const transactionsRes = await getTransactions();
      const txData = transactionsRes.data.data || [];

      txData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTransactions(txData);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <DashboardNavbar />

      {/* MAIN CONTENT */}
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard
          </h1>

          {/* WATCHLIST + ORDER FORM */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* WATCHLIST */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <Watchlist onSelect={setSelectedSymbol} />
            </div>

            {/* ORDER FORM */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <OrderForm
                selectedSymbol={selectedSymbol}
                onOrderSuccess={fetchDashboardData}
              />
            </div>
          </div>

          {/* WALLET + HOLDINGS */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* WALLET */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <WalletCard
                balance={
                  balance !== null ? formatCurrency(balance) : "₹0.00"
                }
                onRefresh={fetchDashboardData}
              />
            </div>

            {/* HOLDINGS */}
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h2 className="text-xl font-semibold mb-6">
                Holdings
              </h2>

              {holdings.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No holdings available
                </p>
              ) : (
                holdings.map((h) => (
                  <div
                    key={h._id}
                    className="grid grid-cols-3 py-3 border-b text-sm"
                  >
                    <span className="font-medium">{h.symbol}</span>
                    <span className="text-right">
                      Qty: {h.quantity}
                    </span>
                    <span className="text-right">
                      {formatCurrency(h.averagePrice)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TRANSACTIONS */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-xl font-semibold mb-6">
              Transactions
            </h2>

            {transactions.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No transactions available
              </p>
            ) : (
              transactions.map((t) => (
                <div
                  key={t._id}
                  className="grid grid-cols-3 py-3 border-b text-sm"
                >
                  <span className="font-medium">{t.type}</span>
                  <span className="text-right">
                    {formatCurrency(t.amount)}
                  </span>
                  <span className="text-right text-gray-500">
                    {formatCurrency(t.balanceAfter)}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}