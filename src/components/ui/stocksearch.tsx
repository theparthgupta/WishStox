import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StockSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ symbol: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchStockData(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  async function fetchStockData(searchTerm: string) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=YOUR_API_KEY`
      );
      const data = await response.json();

      if (data.bestMatches) {
        setResults(
          data.bestMatches.map((stock: any) => ({
            symbol: stock["1. symbol"],
            name: stock["2. name"],
          }))
        );
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleStockClick(symbol: string) {
    navigate(`/stocks/${symbol}`);
  }

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-7 w-7 text-gray-400" />
        <input
          type="text"
          placeholder="Search stocks..."
          className="pl-12 border rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-10">
        {/* Loading Indicator */}
        {loading && <p className="text-gray-500 text-sm mt-1 px-4">Loading...</p>}

        {/* Search Results Dropdown */}
        {query && results.length > 0 && (
          <ul>
            {results.map((stock) => (
              <li
                key={stock.symbol}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleStockClick(stock.symbol)}
              >
                {stock.symbol} - {stock.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
