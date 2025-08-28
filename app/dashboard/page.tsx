"use client";

import React from 'react';
import StockAnalyzer from '@/components/stock-analyzer';
import MarketTicker from '@/components/market-ticker';
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

        {/* Stock Analyzer Component */}
        <StockAnalyzer />

        <div className="mb-8">
          <MarketTicker />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
