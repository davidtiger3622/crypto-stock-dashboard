import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js'
import { getCoinChart } from '../services/cryptoService'
import { getStockChart } from '../services/stockService'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

const PERIODS = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
]

function PriceChart({ searchType, query }) {
  const [chartData, setChartData] = useState(null)
  const [activePeriod, setActivePeriod] = useState(7)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) return
    const fetchChart = async () => {
      setLoading(true)
      setError(null)
      setChartData(null)
      try {
        let labels = []
        let prices = []

        if (searchType === 'crypto') {
          const data = await getCoinChart(query, activePeriod)
          labels = data.prices.map(([timestamp]) =>
            new Date(timestamp).toLocaleDateString()
          )
          prices = data.prices.map(([, price]) => price)
        } else {
          const data = await getStockChart(query)
          const entries = Object.entries(data).slice(0, activePeriod === 1 ? 1 : activePeriod).reverse()
          labels = entries.map(([date]) => date)
          prices = entries.map(([, val]) => parseFloat(val['4. close']))
        }

        setChartData({
          labels,
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59,130,246,0.1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.4,
            },
          ],
        })
      } catch (err) {
        setError('Chart data unavailable for this asset. Try again in a moment.')
      } finally {
        setLoading(false)
      }
    }
    fetchChart()
  }, [query, activePeriod, searchType])

  if (!query) return null

  return (
    <div className="bg-gray-800 rounded-2xl p-6 w-full">
      <div className="flex gap-2 mb-4">
        {PERIODS.map(({ label, days }) => (
          <button
            key={days}
            onClick={() => setActivePeriod(days)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
              activePeriod === days
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {loading && <p className="text-center text-gray-400">Loading chart...</p>}
      {error && <p className="text-center text-yellow-400 text-sm">{error}</p>}
      {!loading && !error && chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
              y: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
            },
          }}
        />
      )}
    </div>
  )
}

export default PriceChart
