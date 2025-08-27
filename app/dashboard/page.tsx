"use client";

import React from 'react';
import StockAnalyzer from '@/components/stock-analyzer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Brain, Newspaper, Target } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">WishStox</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">MVP</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                AI-Powered Stock Analysis Platform
              </div>
              <a 
                href="/" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to WishStox Dashboard!</CardTitle>
              <CardDescription>
                You've successfully accessed our exclusive MVP! Get AI-powered stock analysis combining technical indicators and real-time news sentiment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">🚀 Quick Start Guide:</h3>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Enter any US stock symbol (e.g., AAPL, TSLA, MSFT) in the analyzer below</li>
                  <li>Click "Analyze Stock" to get real-time analysis</li>
                  <li>Review the buy/sell/hold recommendation and supporting data</li>
                  <li>Check out the news sentiment analysis for market context</li>
                </ol>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Technical Analysis</p>
                    <p className="text-sm text-blue-700">SMA Cross Signals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Newspaper className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">News Sentiment</p>
                    <p className="text-sm text-green-700">Real-time Analysis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <Brain className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">AI Recommendations</p>
                    <p className="text-sm text-purple-700">Smart Signals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                  <Target className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Combined Score</p>
                    <p className="text-sm text-orange-700">Final Decision</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Analyzer Component */}
        <StockAnalyzer />

        {/* MVP Notice */}
        <div className="mt-8">
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">MVP Features Available</h3>
                <p className="text-gray-600 mb-4">
                  This is our Minimum Viable Product built in 2 days! More features coming soon:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">✅ Current Features</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Stock quote & analysis</li>
                      <li>• Technical indicators (SMA)</li>
                      <li>• News sentiment analysis</li>
                      <li>• Buy/Sell/Hold signals</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded">
                    <p className="font-medium">🚧 Coming Soon</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Portfolio tracking</li>
                      <li>• Advanced indicators</li>
                      <li>• Price alerts</li>
                      <li>• Social sentiment</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="font-medium">🎯 Future Features</p>
                    <ul className="mt-2 space-y-1">
                      <li>• AI-powered predictions</li>
                      <li>• Risk assessment</li>
                      <li>• Options analysis</li>
                      <li>• Paper trading</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
