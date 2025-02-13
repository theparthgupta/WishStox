import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StockDetails from "./pages/stockdetails";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks/:symbol" element={<StockDetails />} />
      </Routes>
    </BrowserRouter>
  )
}