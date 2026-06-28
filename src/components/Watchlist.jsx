function Watchlist({ items, onRemove, onSelect }) {
    if (items.length === 0) {
      return (
        <div className="w-full max-w-2xl mx-auto mt-6 bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">My Watchlist</h2>
          <p className="text-gray-400 text-sm">No items yet. Search for a coin or stock and add it!</p>
        </div>
      )
    }
  
    return (
      <div className="w-full max-w-2xl mx-auto mt-6 bg-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">My Watchlist</h2>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-700 rounded-xl px-4 py-3"
            >
              {/* Left side - click to load */}
              <button
                onClick={() => onSelect(item)}
                className="flex items-center gap-3 text-left"
              >
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-400 text-xs uppercase">{item.symbol}</p>
                </div>
              </button>
  
              {/* Right side - price and remove */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold">${parseFloat(item.price).toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${parseFloat(item.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(item.change) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(item.change)).toFixed(2)}%
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-red-400 text-lg font-bold transition-colors"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  export default Watchlist
