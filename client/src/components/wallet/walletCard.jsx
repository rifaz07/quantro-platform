import { useState } from "react";
import { depositMoney, withdrawMoney } from "../../api/walletApi";

export default function WalletCard({ balance, loading, onRefresh }) {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDeposit = async () => {
    if (!amount || submitting) return;

    try {
      setSubmitting(true);
      setError("");

      await depositMoney({ amount: Number(amount) });

      setAmount("");
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Deposit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || submitting) return;

    try {
      setSubmitting(true);
      setError("");

      await withdrawMoney({ amount: Number(amount) });

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
      <h2>Wallet Balance</h2>
      <p>{loading ? "Loading..." : balance}</p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={submitting}
      />

      <button onClick={handleDeposit} disabled={submitting}>
        {submitting ? "Processing..." : "Deposit"}
      </button>

      <button onClick={handleWithdraw} disabled={submitting}>
        {submitting ? "Processing..." : "Withdraw"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}