function TopCoins({ coins, onSelect }) {
    return (
      <div className="w-full mb-8">
        <h2 className="text-lg font-bold text-gray-300 mb-4">Top 10 by Market Cap</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coins.map((coin, index) => (
            <button
              key={coin.id}
              onClick={() => onSelect(coin)}
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-xl px-4 py-3 text-left"
            >
              <span className="text-gray-500 text-sm w-5">{index + 1}</span>
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{coin.name}</p>
                <p className="text-gray-400 text-xs uppercase">{coin.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${parseFloat(coin.current_price).toLocaleString()}</p>
                <p className={`text-xs font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  export default TopCoins
