"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StockAnalysis {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  technicalSignal: {
    signal: 'BUY' | 'SELL' | 'HOLD';
    strength: 'STRONG' | 'WEAK';
    reason: string;
    sma5: number;
    sma20: number;
  };
  sentiment: {
    score: number;
    label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    newsCount: number;
  };
  finalRecommendation: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL';
  news: Array<{
    headline: string;
    source: string;
    url: string;
    summary: string;
  }>;
  explanation: string;
}

const StockAnalyzer: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!symbol.trim()) {
      setError('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/stock-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: symbol.toUpperCase() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze stock');
      }

      const data = await response.json();
      setAnalysis(data);
      
      // Show success message briefly
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
      successDiv.textContent = `✅ ${symbol.toUpperCase()} analysis complete!`;
      document.body.appendChild(successDiv);
      setTimeout(() => {
        document.body.removeChild(successDiv);
      }, 3000);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze stock. Please try again.';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'STRONG BUY':
        return 'bg-green-600 text-white';
      case 'BUY':
        return 'bg-green-500 text-white';
      case 'HOLD':
        return 'bg-yellow-500 text-white';
      case 'SELL':
        return 'bg-red-500 text-white';
      case 'STRONG SELL':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'NEGATIVE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'NEUTRAL':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTechnicalSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'SELL':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'HOLD':
        return <Minus className="w-4 h-4 text-yellow-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTechnicalSignalBadgeColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'border-green-500 text-green-700';
      case 'SELL':
        return 'border-red-500 text-red-700';
      case 'HOLD':
        return 'border-yellow-500 text-yellow-700';
      default:
        return 'border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">WishStox AI Stock Analyzer</CardTitle>
          <CardDescription>
            Get AI-powered stock analysis combining technical indicators and news sentiment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1"
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Stock'
              )}
            </Button>
          </div>

          {/* Quick Examples */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Popular stocks to try:</p>
            <div className="flex flex-wrap gap-2">
              {['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'].map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => setSymbol(ticker)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
                  disabled={loading}
                >
                  {ticker}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-6">
          {/* Stock Price & Recommendation */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold">{analysis.symbol}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-semibold">${analysis.currentPrice.toFixed(2)}</span>
                    <span className={`text-sm ${analysis.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.change >= 0 ? '+' : ''}{analysis.change.toFixed(2)} ({analysis.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <Badge className={`text-lg px-4 py-2 ${getRecommendationColor(analysis.finalRecommendation)}`}>
                  {analysis.finalRecommendation}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{analysis.explanation}</p>
            </CardContent>
          </Card>

          {/* Technical Analysis & Sentiment */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTechnicalSignalIcon(analysis.technicalSignal.signal)}
                  Technical Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Signal:</span>
                    <Badge variant="outline" className={getTechnicalSignalBadgeColor(analysis.technicalSignal.signal)}>
                      {analysis.technicalSignal.strength} {analysis.technicalSignal.signal}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>5-day SMA:</span>
                    <span className="font-medium">${analysis.technicalSignal.sma5.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20-day SMA:</span>
                    <span className="font-medium">${analysis.technicalSignal.sma20.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{analysis.technicalSignal.reason}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>News Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Overall Sentiment:</span>
                    <Badge className={getSentimentColor(analysis.sentiment.label)}>
                      {analysis.sentiment.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sentiment Score:</span>
                    <span className="font-medium">{analysis.sentiment.score.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>News Articles:</span>
                    <span className="font-medium">
                      {analysis.sentiment.newsCount} articles analyzed
                      {analysis.sentiment.newsCount <= 3 && analysis.sentiment.newsCount > 0 && (
                        <span className="text-xs text-gray-500 ml-1">(general market)</span>
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent News */}
          <Card>
            <CardHeader>
              <CardTitle>Recent News</CardTitle>
              <CardDescription>Latest news affecting {analysis.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.news.length > 0 ? (
                <div className="space-y-4">
                  {analysis.news.slice(0, 5).map((item, index) => (
                    <div key={`${item.headline.slice(0, 30)}-${index}`} className="border-l-4 border-blue-200 pl-4 py-2">
                      <h4 className="font-medium text-gray-900 leading-tight">{item.headline}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Source: {item.source}</span>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Read more →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">📰</div>
                  <p className="text-gray-600">No recent news available for {analysis.symbol}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Analysis based on technical indicators only
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StockAnalyzer;
