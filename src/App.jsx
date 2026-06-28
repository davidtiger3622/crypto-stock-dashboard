import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import PriceCard from './components/PriceCard'
import PriceChart from './components/PriceChart'
import Watchlist from './components/Watchlist'
import Header from './components/Header'
import TopCoins from './components/TopCoins'
import TopStocks from './components/TopStocks'
import Skeleton from './components/Skeleton'
import { getTopCoins } from './services/cryptoService'
import { getStockQuote } from './services/stockService'

function App() {
  const [searchType, setSearchType] = useState('crypto')
  const [cardData, setCardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [topCoins, setTopCoins] = useState([])
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const coins = await getTopCoins()
        setTopCoins(coins.slice(0, 10))
      } catch (err) {
        console.error(err)
      }
    }
    fetchTopCoins()
  }, [])

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)
    setCardData(null)

    try {
      if (searchType === 'crypto') {
        const coins = await getTopCoins()
        const coin = coins.find(c =>
          c.id.toLowerCase() === query.toLowerCase() ||
          c.symbol.toLowerCase() === query.toLowerCase()
        )
        if (!coin) throw new Error(`"${query}" was not found in Crypto. Please check your spelling and confirm you have selected the right category.`)
        setCardData({
          name: coin.name,
          symbol: coin.symbol,
          price: coin.current_price,
          change: coin.price_change_percentage_24h,
          image: coin.image,
          id: coin.id,
          type: 'crypto',
        })
      } else {
        const quote = await getStockQuote(query.toUpperCase())
        if (!quote || !quote['05. price']) throw new Error(`"${query.toUpperCase()}" was not found in Stocks. Please check your spelling and confirm you have selected the right category.`)
        setCardData({
          name: query.toUpperCase(),
          symbol: query.toUpperCase(),
          price: quote['05. price'],
          change: quote['10. change percent'].replace('%', ''),
          image: null,
          id: query.toUpperCase(),
          type: 'stock',
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectCoin = (coin) => {
    setCardData({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      change: coin.price_change_percentage_24h,
      image: coin.image,
      id: coin.id,
      type: 'crypto',
    })
    setSearchType('crypto')
  }

  const handleAddToWatchlist = () => {
    if (!cardData) return
    const exists = watchlist.find(item => item.id === cardData.id)
    if (exists) return
    setWatchlist([...watchlist, cardData])
  }

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id))
  }

  const handleSelectFromWatchlist = (item) => {
    setSearchType(item.type)
    setCardData(item)
  }

  const isInWatchlist = cardData && watchlist.find(item => item.id === cardData.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white p-6 px-8 lg:px-16 xl:px-24">
      <Header />
      <SearchBar
        onSearch={handleSearch}
        onTypeChange={setSearchType}
        searchType={searchType}
      />
      {loading && <Skeleton />}
      {cardData && (
        <button
          onClick={() => setCardData(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          ← Back to Dashboard
        </button>
      )}
      {error && (
        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-center text-red-400">{error}</p>
          <button
            onClick={() => { setError(null); setCardData(null) }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      )}
      {cardData && (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <PriceCard {...cardData} />
            <div className="flex justify-center">
              <button
                onClick={handleAddToWatchlist}
                disabled={!!isInWatchlist}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  isInWatchlist
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <PriceChart
              searchType={searchType}
              query={searchType === 'crypto' ? cardData.id : cardData.symbol}
            />
          </div>
        </div>
      )}
      {!cardData && !loading && !error && (
        <div className="flex flex-col gap-8">
          {topCoins.length > 0 && (
            <TopCoins coins={topCoins} onSelect={handleSelectCoin} />
          )}
          <TopStocks />
        </div>
      )}
      <Watchlist
        items={watchlist}
        onRemove={handleRemoveFromWatchlist}
        onSelect={handleSelectFromWatchlist}
      />
    </div>
  )
}

export default App
