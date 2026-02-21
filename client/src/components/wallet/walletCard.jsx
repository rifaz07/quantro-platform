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
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Wallet Balance</h2>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        {loading ? "Loading..." : balance}
      </p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={submitting}
        style={{ padding: "8px", marginRight: "8px" }}
      />

      <button
        onClick={handleDeposit}
        disabled={submitting}
        style={{ marginRight: "6px" }}
      >
        {submitting ? "Processing..." : "Deposit"}
      </button>

      <button onClick={handleWithdraw} disabled={submitting}>
        {submitting ? "Processing..." : "Withdraw"}
      </button>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "8px" }}>{success}</p>}
    </div>
  );
}