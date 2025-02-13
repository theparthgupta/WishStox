import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import FeatureCard from "@/components/ui/FeatureCard";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, BarChart3, Brain, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                  Track Stocks with Precision
                </h1>
                <p className="mx-auto max-w-[800px] text-gray-500 text-lg md:text-2xl dark:text-gray-400">
                  Stay ahead of the market with real-time updates, custom stock buckets, and AI-powered insights.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="text-lg md:text-xl px-6 py-3">Get Started</Button>
                <Button variant="outline" className="text-lg md:text-xl px-6 py-3">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-16">
             Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 justify-items-center">
              <FeatureCard
                icon={ArrowUpDown}
                title="Real-Time Stock Updates"
                description="Get instant updates on stock prices, market trends, and breaking news."
              />
              <FeatureCard
                icon={Layers}
                title="Custom Stock Buckets"
                description="Organize and monitor your investments with personalized stock buckets."
              />
              <FeatureCard
                icon={Brain}
                title="AI-Powered Insights"
                description="Leverage AI to gain insights, predict trends, and make better decisions."
             />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
