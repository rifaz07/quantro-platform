import { useState } from "react";
import { depositMoney, withdrawMoney } from "../../api/walletApi";

export default function WalletCard({ balance, loading, onRefresh }) {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (!amount) return;

    await depositMoney({ amount });
    setAmount("");
    onRefresh(); // refresh dashboard
  };

  const handleWithdraw = async () => {
    if (!amount) return;

    await withdrawMoney({ amount });
    setAmount("");
    onRefresh();
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
      />

      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}