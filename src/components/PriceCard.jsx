function PriceCard({ name, symbol, price, change, image }) {
    const isPositive = change >= 0
  
    return (
      <div className="bg-gray-800 rounded-2xl p-6 flex items-center gap-4 w-full max-w-md mx-auto mb-6">
        
        {/* Coin/Stock image or icon */}
        {image && (
          <img src={image} alt={name} className="w-12 h-12 rounded-full" />
        )}
  
        {/* Name and symbol */}
        <div className="flex-1">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-400 text-sm uppercase">{symbol}</p>
        </div>
  
        {/* Price and change */}
        <div className="text-right">
          <p className="text-2xl font-bold">
            ${parseFloat(price).toLocaleString()}
          </p>
          <p className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(parseFloat(change)).toFixed(2)}%
          </p>
        </div>
  
      </div>
    )
  }
  
  export default PriceCard
  