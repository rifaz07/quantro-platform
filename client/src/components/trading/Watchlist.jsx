export default function Watchlist({ onSelect }) {
  const marketData = [
    { symbol: "BTCUSD", last: 67725, change: -267, percent: -0.39 },
    { symbol: "ETHUSD", last: 1960.07, change: -8.13, percent: -0.41 },
    { symbol: "SOLUSD", last: 84.42, change: -0.25, percent: -0.30 },
    { symbol: "XAUUSD", last: 5108.25, change: 111.76, percent: 2.24 },
    { symbol: "US500", last: 6910.3, change: 54.3, percent: 0.79 },
    { symbol: "SILVER", last: 84.57, change: 6.07, percent: 7.74 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Watchlist
      </h2>

      {/* Header */}
      <div className="grid grid-cols-4 text-xs text-gray-500 font-semibold border-b pb-2">
        <span>Symbol</span>
        <span className="text-right">Last</span>
        <span className="text-right">Chg</span>
        <span className="text-right">Chg%</span>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {marketData.map((item) => (
          <div
            key={item.symbol}
            onClick={() => onSelect(item.symbol)}
            className="grid grid-cols-4 py-3 text-sm cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="font-medium">
              {item.symbol}
            </span>

            <span className="text-right">
              {item.last}
            </span>

            <span
              className={`text-right ${
                item.change >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.change}
            </span>

            <span
              className={`text-right ${
                item.percent >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}