"use client"

import React, { useEffect, useState } from 'react';
import { FinnhubService, StockQuote } from '../app/services/finnhub';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  quote: StockQuote;
}

const DEFAULT_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA' , 'NVDA' , 'META' , 'AMD' , 'NFLX', 'UBER'];

export default function MarketTicker() {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockQuotes = async () => {
    try {
      const quotes = await Promise.all(
        DEFAULT_SYMBOLS.map(async (symbol) => {
          const quote = await FinnhubService.getStockQuote(symbol);
          return { symbol, quote };
        })
      );
      setTickerItems(quotes);
      setError(null);
    } catch (err) {
      setError('Failed to fetch market data');
      console.error('Error fetching stock quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockQuotes();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchStockQuotes, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#000a05]/80 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
        <div className="animate-pulse flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-1 space-y-2">
              <div className="h-4 bg-[#001208]/40 rounded w-3/4"></div>
              <div className="h-4 bg-[#001208]/40 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#000a05]/80 backdrop-blur-sm border border-red-500/20 rounded-lg p-4">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  const renderTickerItem = (item: TickerItem, key: string) => {
    const isPositive = item.quote.d >= 0;
    return (
      <div key={key} className="ticker-item flex items-center space-x-4 px-4">
        <div>
          <p className="text-white font-semibold">{item.symbol}</p>
          <p className="text-sm text-gray-400">${item.quote.c.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
          )}
          <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{item.quote.dp.toFixed(2)}%
          </p>
        </div>
      </div>
    );
  };

  // Create a continuous ticker by duplicating items multiple times
  const renderTickerContent = () => {
    // Create enough duplicates to ensure continuous scrolling
    const multiplier = 4; // More duplications for smoother looping
    const duplicatedItems: React.ReactElement[] = [];
    
    for (let i = 0; i < multiplier; i++) {
      tickerItems.forEach((item, idx) => {
        duplicatedItems.push(renderTickerItem(item, `${item.symbol}-${i}-${idx}`));
      });
    }
    
    return duplicatedItems;
  };

  return (
    <div className="bg-[#000a05]/80 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-25%));
          }
        }
        
        .ticker-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        
        .ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: scroll 15s linear infinite;
        }

        /* Ensure no gaps between items */
        .ticker-item {
          flex-shrink: 0;
        }
      `}</style>
      
      <div className="ticker-container">
        <div className="ticker-track">
          {renderTickerContent()}
        </div>
      </div>
    </div>
  );
}