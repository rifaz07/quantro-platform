export default function Watchlist({ onSelect }) {
  const marketData = [
    { symbol: "BTCUSD", last: 67725, change: -267, percent: -0.39 },
    { symbol: "ETHUSD", last: 1960.07, change: -8.13, percent: -0.41 },
    { symbol: "SOLUSD", last: 84.42, change: -0.25, percent: -0.3 },
    { symbol: "XAUUSD", last: 5108.25, change: 111.76, percent: 2.24 },
    { symbol: "US500", last: 6910.3, change: 54.3, percent: 0.79 },
    { symbol: "SILVER", last: 84.57, change: 6.07, percent: 7.74 },
  ];

  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-4">Watchlist</h2>

      {/* Header */}
      <div className="grid grid-cols-4 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 pb-2 mb-1">
        <span>Symbol</span>
        <span className="text-right">Last</span>
        <span className="text-right">Chg</span>
        <span className="text-right">Chg%</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {marketData.map((item) => (
          <div
            key={item.symbol}
            onClick={() => onSelect(item.symbol)}
            className="grid grid-cols-4 py-3 text-sm cursor-pointer hover:bg-gray-50 rounded-lg px-1 transition"
          >
            <span className="font-bold text-gray-900">{item.symbol}</span>

            <span className="text-right font-mono font-semibold text-gray-700">
              {item.last.toLocaleString("en-IN")}
            </span>

            <span className={`text-right font-mono font-semibold ${
              item.change >= 0 ? "text-green-600" : "text-red-500"
            }`}>
              {item.change >= 0 ? "+" : ""}{item.change}
            </span>

            <span className={`text-right font-mono font-semibold ${
              item.percent >= 0 ? "text-green-600" : "text-red-500"
            }`}>
              {item.percent >= 0 ? "+" : ""}{item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}