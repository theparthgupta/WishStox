import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

type SentimentLabel = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
type SignalType = 'BUY' | 'SELL' | 'HOLD';
type SignalStrength = 'STRONG' | 'WEAK';
type RecommendationType = 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL';

interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price
  l: number; // Low price
  o: number; // Open price
  pc: number; // Previous close
}

interface NewsItem {
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

interface TechnicalSignal {
  signal: SignalType;
  strength: SignalStrength;
  reason: string;
  sma5: number;
  sma20: number;
}

interface StockAnalysis {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  technicalSignal: TechnicalSignal;
  sentiment: {
    score: number;
    label: SentimentLabel;
    newsCount: number;
  };
  finalRecommendation: RecommendationType;
  news: NewsItem[];
  explanation: string;
}

// Simple sentiment analysis function
function analyzeSentiment(text: string): { score: number; label: SentimentLabel } {
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'up', 'rise', 'gain', 'profit', 'growth', 'strong', 'bullish', 'buy', 'upgrade'];
  const negativeWords = ['bad', 'terrible', 'negative', 'down', 'fall', 'loss', 'decline', 'weak', 'bearish', 'sell', 'downgrade', 'risk'];
  
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pos => word.includes(pos))) score += 1;
    if (negativeWords.some(neg => word.includes(neg))) score -= 1;
  });
  
  const normalizedScore = score / words.length;
  
  if (normalizedScore > 0.02) return { score: normalizedScore, label: 'POSITIVE' };
  if (normalizedScore < -0.02) return { score: normalizedScore, label: 'NEGATIVE' };
  return { score: normalizedScore, label: 'NEUTRAL' };
}

// Calculate Simple Moving Average
function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0;
  const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
}

// Get historical data from Alpha Vantage
async function getHistoricalData(symbol: string): Promise<number[]> {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) return [];
    
    const prices = Object.values(timeSeries)
      .slice(0, 25) // Get last 25 days
      .map((day: any) => parseFloat(day['4. close']))
      .reverse(); // Reverse to get chronological order
    
    return prices;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
}

// Generate technical signal
function generateTechnicalSignal(prices: number[], currentPrice: number): TechnicalSignal {
  if (prices.length < 20) {
    return {
      signal: 'HOLD',
      strength: 'WEAK',
      reason: 'Insufficient historical data for reliable analysis',
      sma5: currentPrice,
      sma20: currentPrice
    };
  }
  
  const sma5 = calculateSMA(prices, 5);
  const sma20 = calculateSMA(prices, 20);
  
  const smaDiff = Math.abs(sma5 - sma20) / sma20;
  const priceToSma5 = (currentPrice - sma5) / sma5;
  
  let signal: SignalType;
  let strength: SignalStrength = 'WEAK';
  let reason = '';
  
  // Clear BUY signal: 5-day SMA > 20-day SMA AND price is above 5-day SMA
  if (sma5 > sma20 && currentPrice >= sma5) {
    signal = 'BUY';
    strength = (smaDiff > 0.02 && priceToSma5 > 0.01) ? 'STRONG' : 'WEAK';
    reason = `Bullish trend: 5-day SMA ($${sma5.toFixed(2)}) is above 20-day SMA ($${sma20.toFixed(2)}) and price is trending upward`;
  } 
  // Clear SELL signal: 5-day SMA < 20-day SMA AND price is below 5-day SMA
  else if (sma5 < sma20 && currentPrice <= sma5) {
    signal = 'SELL';
    strength = (smaDiff > 0.02 && priceToSma5 < -0.01) ? 'STRONG' : 'WEAK';
    reason = `Bearish trend: 5-day SMA ($${sma5.toFixed(2)}) is below 20-day SMA ($${sma20.toFixed(2)}) and price is declining`;
  } 
  // Mixed signals or consolidation
  else {
    signal = 'HOLD';
    if (sma5 > sma20) {
      reason = `Consolidation: 5-day SMA ($${sma5.toFixed(2)}) above 20-day SMA ($${sma20.toFixed(2)}) but price below short-term average - wait for clearer direction`;
    } else {
      reason = `Mixed signals: 5-day SMA ($${sma5.toFixed(2)}) below 20-day SMA ($${sma20.toFixed(2)}) but price above short-term average - sideways movement`;
    }
  }
  
  return { signal, strength, reason, sma5, sma20 };
}

// Helper function to get recommendation based on technical signal
function getBasicRecommendation(technicalSignal: TechnicalSignal): RecommendationType {
  if (technicalSignal.signal === 'BUY') {
    return technicalSignal.strength === 'STRONG' ? 'STRONG BUY' : 'BUY';
  }
  if (technicalSignal.signal === 'SELL') {
    return technicalSignal.strength === 'STRONG' ? 'STRONG SELL' : 'SELL';
  }
  return 'HOLD';
}

// Helper function to adjust recommendation based on sentiment
function adjustForSentiment(
  basicRec: RecommendationType,
  technicalSignal: TechnicalSignal,
  sentimentLabel: SentimentLabel
): RecommendationType {
  // Strong technical signals are less influenced by sentiment
  if (technicalSignal.strength === 'STRONG') {
    return basicRec;
  }
  
  // For weak signals, sentiment can influence the decision
  if (technicalSignal.signal === 'BUY' && sentimentLabel === 'NEGATIVE') {
    return 'HOLD';
  }
  if (technicalSignal.signal === 'SELL' && sentimentLabel === 'POSITIVE') {
    return 'HOLD';
  }
  if (technicalSignal.signal === 'HOLD' && sentimentLabel === 'POSITIVE') {
    return 'BUY';
  }
  if (technicalSignal.signal === 'HOLD' && sentimentLabel === 'NEGATIVE') {
    return 'SELL';
  }
  
  return basicRec;
}

// Generate final recommendation based on technical and sentiment analysis
function generateFinalRecommendation(
  technicalSignal: TechnicalSignal,
  sentimentLabel: SentimentLabel
): RecommendationType {
  const basicRecommendation = getBasicRecommendation(technicalSignal);
  return adjustForSentiment(basicRecommendation, technicalSignal, sentimentLabel);
}

// Fetch news data with fallback strategy
async function fetchNewsData(symbol: string): Promise<NewsItem[]> {
  if (!TAVILY_API_KEY) {
    console.warn('TAVILY_API_KEY is not set; returning no news');
    return [];
  }

  const query = `${symbol} stock latest news`; // Focus on stock-related news for the symbol
  try {
    const tavilyResponse = await axios.post(
      'https://api.tavily.com/search',
      {
        api_key: TAVILY_API_KEY,
        query,
        search_depth: 'advanced',
        include_answer: false,
        include_images: false,
        include_domains: [],
        exclude_domains: [],
        max_results: 10,
        days: 7,
        topic: 'news'
      },
      { timeout: 8000 }
    );

    const results = tavilyResponse?.data?.results as Array<{
      title?: string;
      content?: string;
      url?: string;
      published_date?: string;
      source?: string;
      score?: number;
    }> | undefined;

    if (!results || results.length === 0) {
      return [];
    }

    // Map Tavily results to NewsItem[]
    const mapped: NewsItem[] = results.slice(0, 10).map((r, idx) => ({
      category: 'tavily',
      datetime: r.published_date ? Math.floor(new Date(r.published_date).getTime() / 1000) : Math.floor(Date.now() / 1000),
      headline: r.title || 'Untitled',
      id: idx + 1,
      image: '',
      related: symbol.toUpperCase(),
      source: r.source || 'tavily',
      summary: r.content || '',
      url: r.url || ''
    }));

    return mapped;
  } catch (error) {
    console.warn(`Tavily search failed for ${symbol}:`, error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { symbol } = await request.json();
    
    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }
    
    // Fetch current stock quote
    const quoteResponse = await axios.get<StockQuote>(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const quote = quoteResponse.data;
    
    // Check if we got valid quote data
    if (!quote || quote.c === 0) {
      return NextResponse.json(
        { error: `Invalid stock symbol: ${symbol}. Please try a valid US stock symbol like AAPL, TSLA, or MSFT.` },
        { status: 400 }
      );
    }

    // Fetch company news
    const news = await fetchNewsData(symbol);    // Analyze news sentiment
    let totalSentiment = 0;
    let sentimentCount = 0;
    
    if (news.length > 0) {
      news.forEach(item => {
        const sentiment = analyzeSentiment(item.headline + ' ' + item.summary);
        totalSentiment += sentiment.score;
        sentimentCount++;
      });
    }
    
    const avgSentiment = sentimentCount > 0 ? totalSentiment / sentimentCount : 0;
    
    let sentimentLabel: SentimentLabel = 'NEUTRAL';
    if (avgSentiment > 0.01) {
      sentimentLabel = 'POSITIVE';
    } else if (avgSentiment < -0.01) {
      sentimentLabel = 'NEGATIVE';
    }
    
    // Get historical data and generate technical signal
    const historicalPrices = await getHistoricalData(symbol);
    const technicalSignal = generateTechnicalSignal(historicalPrices, quote.c);
    
    // Generate final recommendation
    const finalRecommendation = generateFinalRecommendation(technicalSignal, sentimentLabel);
    
    let explanation = `Based on technical analysis (${technicalSignal.signal} signal)`;
    if (news.length > 0) {
      explanation += ` and news sentiment (${sentimentLabel}), we recommend ${finalRecommendation}. ${technicalSignal.reason}`;
    } else {
      explanation += `, we recommend ${finalRecommendation}. ${technicalSignal.reason} Note: News sentiment unavailable for this symbol.`;
    }
    
    const analysis: StockAnalysis = {
      symbol: symbol.toUpperCase(),
      currentPrice: quote.c,
      change: quote.d,
      changePercent: quote.dp,
      technicalSignal,
      sentiment: {
        score: avgSentiment,
        label: sentimentLabel,
        newsCount: news.length
      },
      finalRecommendation,
      news,
      explanation
    };
    
    return NextResponse.json(analysis);
    
  } catch (error) {
    console.error('Error in stock analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze stock' },
      { status: 500 }
    );
  }
}
