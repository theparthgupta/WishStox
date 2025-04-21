"use client";

import React from 'react';
import MarketTicker from '@/components/market-ticker';
import StockNewsComponent from '@/app/components/news';
import { LineChart, TrendingUp, Newspaper, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#001a0d] to-black text-white">
      {/* Header */}
      <header className="bg-[#000a05]/80 backdrop-blur-sm border-b border-green-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
                <span className="text-white font-bold">WS</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                WishStox
              </span>
            </div>

            <nav className="flex items-center gap-6">
              <Link href="/main" className="flex items-center gap-2 text-green-400">
                <LineChart className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/main/trending" className="flex items-center gap-2 text-gray-300 hover:text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span>Trending</span>
              </Link>
              <Link href="/main/news" className="flex items-center gap-2 text-gray-300 hover:text-green-400">
                <Newspaper className="w-5 h-5" />
                <span>News</span>
              </Link>
              <Link href="/main/settings" className="flex items-center gap-2 text-gray-300 hover:text-green-400">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
    
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
      
        {/* Market Ticker */}
        <div className="mb-8">
          <MarketTicker />
        </div>

        {/* Latest Market News */}
        <div className="mb-8">
          <StockNewsComponent />
        </div>
      </main>
    </div>
  );
}