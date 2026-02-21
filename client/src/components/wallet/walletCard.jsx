import { useState } from "react";
import { depositMoney, withdrawMoney } from "../../api/walletApi";

export default function WalletCard({ balance, loading, onRefresh }) {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateAmount = () => {
    const num = Number(amount);

    if (!num || num <= 0) {
      setError("Enter a valid amount greater than 0");
      return false;
    }

    return true;
  };

  const handleDeposit = async () => {
    if (submitting) return;
    setError("");
    setSuccess("");

    if (!validateAmount()) return;

    try {
      setSubmitting(true);

      await depositMoney({ amount: Number(amount) });

      setSuccess("Deposit successful");
      setAmount("");
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Deposit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (submitting) return;
    setError("");
    setSuccess("");

    if (!validateAmount()) return;

    try {
      setSubmitting(true);

      await withdrawMoney({ amount: Number(amount) });

      setSuccess("Withdraw successful");
      setAmount("");
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Withdraw failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight mb-4">
        Wallet Balance
      </h2>

      {/* BALANCE PLACEHOLDER */}
      {loading ? (
        <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md mb-6" />
      ) : (
        <p className="text-3xl font-semibold text-gray-800 mb-6">
          {balance || "₹0.00"}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={submitting}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleDeposit}
          disabled={submitting}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Deposit"}
        </button>

        <button
          onClick={handleWithdraw}
          disabled={submitting}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Withdraw"}
        </button>
      </div>

      {error && (
        <p className="text-rose-600 text-sm font-medium">
          {error}
        </p>
      )}

      {success && (
        <p className="text-emerald-600 text-sm font-medium">
          {success}
        </p>
      )}
    </div>
  );
}