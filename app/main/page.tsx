"use client";

import React, { useState } from 'react';
import MarketTicker from '@/components/market-ticker';
import { LineChart, TrendingUp, Newspaper, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from "@clerk/nextjs";

export default function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#001a0d] to-black text-white">
      {/* Header */}
      <header className="bg-[#000a05]/80 backdrop-blur-sm border-b border-green-500/20 relative z-20">
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

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
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
              <SignOutButton>
                <button className="ml-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer">Logout</button>
              </SignOutButton>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X className="h-7 w-7 text-green-400" /> : <Menu className="h-7 w-7 text-green-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 z-30 flex flex-col items-center justify-center gap-8 animate-fade-in">
          <nav className="flex flex-col items-center gap-6 text-xl">
            <Link href="/main" className="flex items-center gap-2 text-green-400" onClick={() => setMobileNavOpen(false)}>
              <LineChart className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/main/trending" className="flex items-center gap-2 text-gray-300 hover:text-green-400" onClick={() => setMobileNavOpen(false)}>
              <TrendingUp className="w-5 h-5" />
              <span>Trending</span>
            </Link>
            <Link href="/main/news" className="flex items-center gap-2 text-gray-300 hover:text-green-400" onClick={() => setMobileNavOpen(false)}>
              <Newspaper className="w-5 h-5" />
              <span>News</span>
            </Link>
            <Link href="/main/settings" className="flex items-center gap-2 text-gray-300 hover:text-green-400" onClick={() => setMobileNavOpen(false)}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <SignOutButton>
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer w-full" onClick={() => setMobileNavOpen(false)}>Logout</button>
            </SignOutButton>
          </nav>
        </div>
      )}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Market Ticker */}
        <div className="mb-8">
          <MarketTicker />
        </div>
      </main>
    </div>
  );
}