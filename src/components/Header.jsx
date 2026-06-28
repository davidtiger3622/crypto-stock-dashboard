function Header() {
  return (
    <div className="text-center mb-10">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="bg-blue-600 rounded-xl p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Crypto & Stock Dashboard
        </h1>
      </div>
      <p className="text-gray-400 text-sm">Live prices, charts and your personal watchlist</p>
    </div>
  )
}

export default Header