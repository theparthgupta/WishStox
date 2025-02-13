import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StockDetails() {
  const { symbol } = useParams(); // Get stock symbol from URL
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockDetails() {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=GNYZEFIZGV3IQ1BJ`
        );
        const data = await response.json();
        setStockData(data["Time Series (Daily)"]);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (symbol) {
      fetchStockDetails();
    }
  }, [symbol]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Stock Details: {symbol}</h1>

      {loading && <p>Loading stock data...</p>}

      {stockData ? (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Latest Stock Prices</h2>
          <ul className="mt-2">
            {Object.entries(stockData).slice(0, 5).map(([date, data]: any) => (
              <li key={date} className="p-2 border-b">
                <strong>{date}:</strong> Open: {data["1. open"]}, High: {data["2. high"]}, Low: {data["3. low"]}, Close: {data["4. close"]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
