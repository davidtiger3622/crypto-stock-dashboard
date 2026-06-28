import { useState } from 'react'

function SearchBar({ onSearch, onTypeChange, searchType }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-8">

      {/* Toggle between Crypto and Stock */}
      <div className="flex gap-2">
        <button
          onClick={() => onTypeChange('crypto')}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            searchType === 'crypto'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Crypto
        </button>
        <button
          onClick={() => onTypeChange('stock')}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            searchType === 'stock'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Stock
        </button>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchType === 'crypto' ? 'e.g. bitcoin' : 'e.g. AAPL'}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          Search
        </button>
      </form>

    </div>
  )
}

export default SearchBar
