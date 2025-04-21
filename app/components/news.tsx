"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Clock, RefreshCcw, Newspaper } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// Types
export interface MarketNews {
  id: string
  headline: string
  summary: string
  url: string
  source: string
  datetime: number
  image?: string
}

interface StockNewsProps {
  /** Maximum number of news items to display */
  limit?: number
  /** Auto-refresh interval in milliseconds (default: 15 minutes) */
  refreshInterval?: number
  /** Custom title for the news card */
  title?: string
  /** Custom class names to apply to the container */
  className?: string
  /** Function to fetch news data */
  fetchNewsFunction?: () => Promise<MarketNews[]>
  /** Height of the component (default: 'auto') */
  height?: string | number
  /** Layout style: 'grid' or 'list' */
  layout?: "grid" | "list"
  /** Number of columns in grid layout (default: 3) */
  columns?: number
}

export default function StockNews({
  limit = 6,
  refreshInterval = 900000, // 15 minutes
  title = "Market News",
  className,
  fetchNewsFunction,
  height = "auto",
  layout = "grid",
  columns = 3,
}: StockNewsProps) {
  const [news, setNews] = useState<MarketNews[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchMarketNews = async () => {
    try {
      setLoading(true)

      let newsData: MarketNews[]

      if (fetchNewsFunction) {
        newsData = await fetchNewsFunction()
      } else if (typeof window !== "undefined" && window.FinnhubService) {
        // Use the global FinnhubService if available
        newsData = await window.FinnhubService.getMarketNews()
      } else {
        throw new Error("No news fetching function provided")
      }

      // Limit news items
      setNews(newsData.slice(0, limit))
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError("Failed to fetch market news")
      console.error("Error fetching market news:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketNews()

    // Set up refresh interval
    const interval = setInterval(fetchMarketNews, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

  // Get relative time (e.g., "5m ago")
  const getRelativeTime = (timestamp: number) => {
    const now = new Date().getTime()
    const time = timestamp * 1000
    const diff = now - time

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    if (minutes > 0) return `${minutes}m`
    return "now"
  }

  return (
    <Card
      className={cn("bg-[#000a05]/90 backdrop-blur-sm border-green-500/20 text-white", className)}
      style={{ height }}
    >
      <CardHeader className="p-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Newspaper className="text-green-400 w-4 h-4" />
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        {!loading && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-green-400"
            onClick={fetchMarketNews}
            title="Refresh news"
          >
            <RefreshCcw className="h-3 w-3" />
            <span className="sr-only">Refresh</span>
          </Button>
        )}
      </CardHeader>

      <CardContent
        className="p-2 overflow-auto"
        style={{ maxHeight: height !== "auto" ? "calc(100% - 40px)" : undefined }}
      >
        {loading ? (
          <div className={cn(
            "grid gap-2",
            layout === "grid" ? `grid-cols-${columns}` : "grid-cols-1"
          )}>
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="bg-[#001208]/40 rounded p-2 h-24">
                <Skeleton className="h-3 w-3/4 bg-[#001208]/60 mb-2" />
                <Skeleton className="h-2 w-1/2 bg-[#001208]/60 mb-1" />
                <Skeleton className="h-2 w-full bg-[#001208]/60" />
                <Skeleton className="h-2 w-2/3 bg-[#001208]/60 mt-1" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-2 text-center">
            <p className="text-red-400 text-xs">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-xs h-6 border-green-500/20 text-green-400 hover:bg-green-500/10"
              onClick={fetchMarketNews}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div 
            className={cn(
              "grid gap-2",
              layout === "grid" ? `grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}` : "grid-cols-1"
            )}
          >
            {news.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-[#001208]/40 hover:bg-[#001208]/60 rounded p-2 transition-colors border border-transparent hover:border-green-500/20"
              >
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-medium text-xs text-white line-clamp-2">
                    {item.headline}
                  </h3>
                  <ExternalLink className="w-3 h-3 flex-shrink-0 text-gray-400 mt-0.5" />
                </div>
                
                <div className="flex items-center justify-between mt-1.5 text-[10px]">
                  <Badge
                    variant="outline"
                    className="px-1 py-0 h-4 bg-green-900/30 border-green-500/20 text-green-300 text-[10px]"
                  >
                    {item.source}
                  </Badge>
                  
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-2.5 h-2.5 mr-0.5" />
                    {getRelativeTime(item.datetime)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
