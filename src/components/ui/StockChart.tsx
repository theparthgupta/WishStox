import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface StockChartProps {
  data: { date: string; close: number }[];
}

export default function StockChart({ data }: StockChartProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Stock Price Trend</h2>
      <ResponsiveContainer width="100%" height={1000}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
