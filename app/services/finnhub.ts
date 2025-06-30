import axios from 'axios';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

if (!FINNHUB_API_KEY) {
  throw new Error('Finnhub API key is not defined');
}

const finnhubClient = axios.create({
  baseURL: BASE_URL,
  params: { token: FINNHUB_API_KEY },
  timeout: 10000, // 10 second timeout
});

export interface StockQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export class FinnhubError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'FinnhubError';
  }
}

export const FinnhubService = {
  async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const response = await finnhubClient.get<StockQuote>(`/quote?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FinnhubError(
          `Failed to fetch stock quote for ${symbol}: ${error.message}`,
          error.response?.status
        );
      }
      throw new FinnhubError(`Failed to fetch stock quote for ${symbol}`);
    }
  },

  async getStockSymbols(exchange: string = 'US'): Promise<any[]> {
    try {
      const response = await finnhubClient.get(`/stock/symbol?exchange=${exchange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock symbols:', error);
      throw error;
    }
  }
};

export interface SectorPerformance {
  sector: string
  change: number
}

export async function getSectorPerformance(): Promise<SectorPerformance[]> {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/sector-performance?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  )

  if (!response.ok) throw new Error("Failed to fetch sector performance")
  return response.json()
}
