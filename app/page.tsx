"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Zap, LineChart, TrendingUp, Briefcase, Brain, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import TestimonialSlider from "@/components/testimonial-slider"
import MarketTicker from "@/components/market-ticker"
import FinanceChart from "@/components/finance-chart"
import { ShootingStars } from "@/components/shooting-stars"
import WaitingList from "@/components/waiting-list"
import { ContainerTextFlip } from "@/components/ui/container-text-flip"

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#001a0d] to-black text-white">
      {/* Background effects */}
      <ShootingStars />

      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold">WS</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
            WishStox
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-300 hover:text-green-400 transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-green-400 transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? <X className="h-7 w-7 text-green-400" /> : <Menu className="h-7 w-7 text-green-400" />}
        </button>
      </header>

      {/* Mobile Nav Menu */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 z-30 flex flex-col items-center justify-center gap-8 animate-fade-in">
          <nav className="flex flex-col items-center gap-6 text-xl">
            <Link href="#features" className="text-gray-300 hover:text-green-400 transition-colors" onClick={() => setMobileNavOpen(false)}>
              Features
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-green-400 transition-colors" onClick={() => setMobileNavOpen(false)}>
              About
            </Link>
            <Link href="#join" className="text-gray-300 hover:text-green-400 transition-colors" onClick={() => setMobileNavOpen(false)}>
              Join
            </Link>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              AI-Powered Stock Trading Signals,{" "}
              <span className="text-green-400">
                <ContainerTextFlip words={[
                  "In Real-Time.",
                  "with Accuracy.",
                  "for Investors.",
                  "for Your Portfolio."
                ]} />
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Leverage AI features to maximize your market potential with actionable insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#join">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none shadow-lg shadow-green-900/30"
                  style={{
                    background: "linear-gradient(to right, #007e33, #004d25)",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 14px 0 rgba(0, 77, 37, 0.3)",
                  }}
                >
                  Join Waiting List <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-400 hover:bg-green-950/50"
                  style={{
                    borderColor: "#007e33",
                    color: "#00c853",
                    backgroundColor: "transparent",
                  }}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="h-[400px] md:h-[500px] relative">
            <FinanceChart />
          </div>
        </div>

        <div className="mt-12 w-full overflow-hidden">
          <MarketTicker />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Advanced AI</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our platform leverages cutting-edge artificial intelligence to provide you with the most accurate trading
            signals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-green-400" />}
            title="In-depth Analysis in Seconds"
            description="Our AI analyzes thousands of data points in seconds to provide you with comprehensive market insights."
            bgColor="from-green-900/30 to-green-900/20"
          />
          <FeatureCard
            icon={<LineChart className="h-10 w-10 text-green-400" />}
            title="Data Signals"
            description="Get real-time signals based on market movements, volume analysis, and trend indicators."
            bgColor="from-green-600/30 to-green-900/20"
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10 text-green-300" />}
            title="Buy & Sell Recommendations"
            description="Receive clear buy and sell recommendations with entry and exit points based on AI predictions."
            bgColor="from-green-500/30 to-green-900/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-green-400" />}
            title="AI-Driven Insights"
            description="Our neural networks continuously learn from market patterns to improve prediction accuracy and provide unique insights."
            bgColor="from-green-600/30 to-green-900/20"
          />
          <FeatureCard
            icon={<Briefcase className="h-10 w-10 text-green-400" />}
            title="Portfolio Analysis"
            description="Get comprehensive analysis of your portfolio with risk assessment, diversification recommendations, and performance forecasts."
            bgColor="from-green-900/30 to-green-900/20"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#001208]/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Traders Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of successful traders who have transformed their trading strategy with our AI platform.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* Contact Section (Waiting List) */}
      <section id="join" className="py-20 bg-[#001208]/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Waiting List</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Be the first to know when WishStox launches! Enter your email below to join our waiting list.
            </p>
          </div>
          <div className="flex justify-center">
            <WaitingList />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000a05] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WS</span>
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                  WishStox
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Leveraging AI to transform stock trading with real-time insights and predictive analytics.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-green-400 text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#join" className="text-gray-400 hover:text-green-400 text-sm">
                    Join
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 text-sm">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 text-sm">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/theparthgupta/WishStox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#001a0d]/80 flex items-center justify-center hover:bg-green-900/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-green-400">
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/parth-gupta07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#001a0d]/80 flex items-center justify-center hover:bg-green-900/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-green-400">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <Link
                  href="https://x.com/the_parthgupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#001a0d]/80 flex items-center justify-center hover:bg-green-900/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-green-400">
                    <path d="M17.53 2.47a.75.75 0 0 1 1.06 1.06l-5.22 5.22 5.22 5.22a.75.75 0 1 1-1.06 1.06l-5.22-5.22-5.22 5.22a.75.75 0 1 1-1.06-1.06l5.22-5.22-5.22-5.22A.75.75 0 1 1 6.31 2.47l5.22 5.22 5.22-5.22z"/>
                  </svg>
                </Link>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                © {new Date().getFullYear()} WishStox AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

