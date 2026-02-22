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
      <h2 className="text-base font-bold text-gray-900 mb-4">Wallet</h2>

      {/* Balance */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          Available Balance
        </p>
        {loading ? (
          <div className="h-9 w-36 bg-gray-100 animate-pulse rounded-lg" />
        ) : (
          <p className="text-3xl font-bold text-gray-900 font-mono tracking-tight">
            {balance || "₹0.00"}
          </p>
        )}
      </div>

      {/* Input + Buttons */}
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={submitting}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-400 transition disabled:opacity-50 font-mono"
        />
        <button
          onClick={handleDeposit}
          disabled={submitting}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? "..." : "Deposit"}
        </button>
        <button
          onClick={handleWithdraw}
          disabled={submitting}
          className="bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition disabled:opacity-50"
        >
          {submitting ? "..." : "Withdraw"}
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <p className="text-red-500 text-xs font-medium">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-xs font-medium">{success}</p>
      )}
    </div>
  );
}