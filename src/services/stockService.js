import axios from 'axios'

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY
const BASE_URL = 'https://www.alphavantage.co/query'

// Fetch current stock quote
export const getStockQuote = async (symbol) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      apikey: API_KEY,
    },
  })
  return response.data['Global Quote']
}

// Fetch daily price history for chart
export const getStockChart = async (symbol) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      apikey: API_KEY,
    },
  })
  return response.data['Time Series (Daily)']
}
