"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface StockData {
  symbol: string
  price: number
  change: number
}

const initialStocks: StockData[] = [
  { symbol: "AAPL", price: 182.63, change: 1.25 },
  { symbol: "MSFT", price: 417.88, change: 2.34 },
  { symbol: "GOOGL", price: 152.19, change: -0.87 },
  { symbol: "AMZN", price: 178.75, change: 1.56 },
  { symbol: "TSLA", price: 172.63, change: -2.31 },
  { symbol: "META", price: 474.99, change: 3.45 },
  { symbol: "NVDA", price: 950.02, change: 5.67 },
  { symbol: "BRK.A", price: 613.78, change: 0.23 },
  { symbol: "JPM", price: 198.45, change: -0.45 },
  { symbol: "V", price: 275.32, change: 1.12 },
]

const MarketTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>(initialStocks)

  // Simulate stock price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const changeAmount = (Math.random() - 0.5) * 2
          const newPrice = Number.parseFloat((stock.price + changeAmount).toFixed(2))
          return {
            ...stock,
            price: newPrice,
            change: Number.parseFloat(changeAmount.toFixed(2)),
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#000a05]/80 backdrop-blur-sm border-y border-green-500/20 py-2 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 30,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...stocks, ...stocks].map((stock, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className="font-semibold text-white">{stock.symbol}</span>
            <span className="ml-2 text-gray-300">${stock.price.toFixed(2)}</span>
            <span className={`ml-2 ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default MarketTicker

