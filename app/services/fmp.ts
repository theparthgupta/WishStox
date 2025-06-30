// services/fmp.ts

export interface SectorPerformance {
  sector: string
  changesPercentage: string // e.g. "+1.25%"
}

export async function getSectorPerformanceFromFMP(): Promise<SectorPerformance[]> {
  const res = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/sectors-performance?apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
  )

  if (!res.ok) throw new Error("Failed to fetch sector performance from FMP")

  const data = await res.json()
  return data.sectorPerformance
}
