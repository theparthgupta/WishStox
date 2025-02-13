import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockChart from "@/components/ui/StockChart";

export default function StockDetails() {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockData, setStockData] = useState<{ date: string; close: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_API_KEY`
        );
        const data = await response.json();

        if (data["Time Series (Daily)"]) {
          const formattedData = Object.entries(data["Time Series (Daily)"])
            .slice(0, 5) // Get last 5 days
            .map(([date, values]: any) => ({
              date,
              close: parseFloat(values["4. close"]),
            }))
            .reverse();

          setStockData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, [symbol]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Stock Details: {symbol}</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <StockChart data={stockData} />
      )}
    </div>
  );
}
