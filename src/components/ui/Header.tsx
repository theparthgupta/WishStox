import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import StockSearch from "@/components/ui/stocksearch";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center justify-center">
        <BarChart3 className="h-12 w-14 mr-2" />
        <span className="font-bold text-4xl">WishStox</span>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/features" className="text-2xl font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="/pricing" className="text-2xl font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link to="/about" className="text-2xl font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="/contact" className="text-2xl font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>

        <div className="w-[32rem]">
          <StockSearch />
        </div>
      </div>
    </header>
  );
}
