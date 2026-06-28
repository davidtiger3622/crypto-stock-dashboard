import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

// Fetch list of top coins by market cap
export const getTopCoins = async () => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 20,
      page: 1,
      sparkline: false,
    },
  })
  return response.data
}

// Fetch price chart data for a specific coin over a time period
export const getCoinChart = async (coinId, days) => {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: days,
    },
  })
  return response.data
}
