import axios from 'axios';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

const finnhubClient = axios.create({
  baseURL: BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  }
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

export interface MarketNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export const FinnhubService = {
  async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const response = await finnhubClient.get(`/quote?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      throw error;
    }
  },

  async getMarketNews(): Promise<MarketNews[]> {
    try {
      const response = await finnhubClient.get('/news?category=general');
      return response.data;
    } catch (error) {
      console.error('Error fetching market news:', error);
      throw error;
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
if (typeof window !== "undefined") {
  ;(window as any).FinnhubService = FinnhubService
}
// services/finnhub.ts

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
