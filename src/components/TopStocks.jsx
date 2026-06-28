const POPULAR_STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.' },
    { symbol: 'META', name: 'Meta Platforms' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
    { symbol: 'JPM', name: 'JPMorgan Chase' },
    { symbol: 'V', name: 'Visa Inc.' },
  ]
  
  function TopStocks() {
    return (
      <div className="w-full mb-8">
        <h2 className="text-lg font-bold text-gray-300 mb-4">Popular Stocks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {POPULAR_STOCKS.map((stock, index) => (
            <div
              key={stock.symbol}
              title="Switch to Stock mode and search this ticker in the search bar"
              className="relative group flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3 cursor-default"
            >
              <span className="text-gray-500 text-sm w-5">{index + 1}</span>
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                {stock.symbol.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{stock.name}</p>
                <p className="text-gray-400 text-xs">{stock.symbol}</p>
              </div>
              <span className="text-gray-500 text-xs">Search to view →</span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg z-10">
                Switch to Stock mode and search {stock.symbol} in the search bar
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default TopStocks
