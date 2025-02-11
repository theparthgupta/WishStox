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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Stocks with Precision
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Stay ahead of the market with real-time updates, custom stock buckets, and AI-powered insights.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
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
