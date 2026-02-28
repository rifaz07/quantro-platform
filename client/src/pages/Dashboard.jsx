import { useEffect, useState } from "react";
import { getWallet } from "../api/walletApi";
import { getHoldings } from "../api/holdingsApi";
import { getTransactions } from "../api/transactionsApi";
import OrderForm from "../components/trading/OrderForm";
import Watchlist from "../components/trading/Watchlist";
import WalletCard from "../components/wallet/WalletCard.jsx";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

const txBadge = (type) => {
  switch (type) {
    case "BUY":      return "bg-green-50 text-green-700";
    case "SELL":     return "bg-red-50 text-red-500";
    case "DEPOSIT":  return "bg-blue-50 text-blue-600";
    case "WITHDRAW": return "bg-yellow-50 text-yellow-600";
    default:         return "bg-gray-100 text-gray-500";
  }
};

const txAmountColor = (direction) =>
  direction === "CREDIT" ? "text-green-600" : "text-red-500";

const txPrefix = (direction) => (direction === "CREDIT" ? "+" : "−");

const COLORS = [
  "#2563eb", "#16a34a", "#f59e0b",
  "#ef4444", "#8b5cf6", "#06b6d4",
];

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
      txData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(txData);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.quantity * h.averagePrice,
    0
  );

  // Doughnut chart data from real holdings
  const chartData = {
    labels: holdings.map((h) => h.symbol),
    datasets: [
      {
        data: holdings.map((h) => h.quantity * h.averagePrice),
        backgroundColor: holdings.map((_, i) => COLORS[i % COLORS.length]),
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.parsed)}`,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Wallet Balance
            </p>
            <p className="text-2xl font-bold text-blue-600 font-mono">
              {balance !== null ? formatCurrency(balance) : "—"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Available to invest</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Holdings
            </p>
            <p className="text-2xl font-bold text-gray-900 font-mono">
              {holdings.length} {holdings.length === 1 ? "Stock" : "Stocks"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Across your portfolio</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Total Invested
            </p>
            <p className="text-2xl font-bold text-green-600 font-mono">
              {holdings.length > 0 ? formatCurrency(totalInvested) : "—"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Avg price tracked</p>
          </div>

        </div>

        {/* WATCHLIST + ORDER FORM */}
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <Watchlist onSelect={setSelectedSymbol} />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <OrderForm
              selectedSymbol={selectedSymbol}
              onOrderSuccess={fetchDashboardData}
            />
          </div>

        </div>

        {/* WALLET + HOLDINGS WITH DOUGHNUT */}
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <WalletCard
              balance={balance !== null ? formatCurrency(balance) : "₹0.00"}
              onRefresh={fetchDashboardData}
            />
          </div>

          {/* HOLDINGS */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-bold text-gray-900 mb-4">Holdings</h2>

            {holdings.length === 0 ? (
              <p className="text-gray-400 text-sm">No holdings yet</p>
            ) : (
              <div className="flex items-center gap-6">

                {/* DOUGHNUT */}
                <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
                  <Doughnut data={chartData} options={chartOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Invested
                    </span>
                    <span className="text-sm font-bold text-gray-900 font-mono">
                      {formatCurrency(totalInvested)}
                    </span>
                  </div>
                </div>

                {/* TABLE */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 pb-2 mb-1">
                    <span>Symbol</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Avg Price</span>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {holdings.map((h, i) => (
                      <div key={h._id} className="grid grid-cols-3 py-2.5 text-sm items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: COLORS[i % COLORS.length] }}
                          />
                          <span className="font-bold text-gray-900">{h.symbol}</span>
                        </div>
                        <span className="text-right font-mono text-gray-500">
                          {h.quantity}
                        </span>
                        <span className="text-right font-mono font-semibold text-gray-800">
                          {formatCurrency(h.averagePrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Recent Transactions
          </h2>

          {transactions.length === 0 ? (
            <p className="text-gray-400 text-sm">No transactions yet</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <div key={t._id} className="flex items-center gap-3 py-3">

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md w-16 text-center flex-shrink-0 ${txBadge(t.type)}`}>
                    {t.type}
                  </span>

                  <span className="flex-1 text-sm text-gray-500">
                    {t.description || t.type}
                  </span>

                  <span className={`text-sm font-bold font-mono ${txAmountColor(t.direction)}`}>
                    {txPrefix(t.direction)}{formatCurrency(t.amount)}
                  </span>

                  <span className="text-xs text-gray-400 font-mono w-24 text-right">
                    bal {formatCurrency(t.balanceAfter)}
                  </span>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}