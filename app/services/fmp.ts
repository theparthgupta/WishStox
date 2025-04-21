// services/fmp.ts

export interface SectorPerformance {
  sector: string
  changesPercentage: string // e.g. "+1.25%"
}

export interface MajorIndex {
  symbol: string
  name: string
  price: number
  changesPercentage: number
  change: number
}

export async function getSectorPerformanceFromFMP(): Promise<SectorPerformance[]> {
  const res = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/sectors-performance?apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
  )

  if (!res.ok) throw new Error("Failed to fetch sector performance from FMP")

  const data = await res.json()
  return data.sectorPerformance
}

export async function getMajorIndexesFromFMP(): Promise<MajorIndex[]> {
  try {
    // The URL might need encoding for the special characters
    const encodedUrl = encodeURI(`https://financialmodelingprep.com/api/v3/quote/^GSPC,^DJI,^IXIC?apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`)
    
    const res = await fetch(encodedUrl)

    if (!res.ok) {
      console.error(`FMP API returned ${res.status}: ${res.statusText}`)
      throw new Error(`API returned ${res.status}`)
    }

    const data = await res.json()
    
    // In case we get no data but a successful response
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No index data returned from API")
    }
    
    // Map the response to our interface
    return data.map((index: any) => ({
      symbol: index.symbol,
      name: index.name,
      price: index.price,
      changesPercentage: index.changesPercentage,
      change: index.change
    }))
  } catch (error) {
    console.error("Error fetching major indexes:", error)
    
    // Return fallback data so the UI doesn't break
    return [
      {
        symbol: "^GSPC",
        name: "S&P 500",
        price: 0,
        changesPercentage: 0,
        change: 0
      },
      {
        symbol: "^DJI",
        name: "Dow Jones",
        price: 0,
        changesPercentage: 0,
        change: 0
      },
      {
        symbol: "^IXIC",
        name: "NASDAQ",
        price: 0,
        changesPercentage: 0,
        change: 0
      }
    ]
  }
}
