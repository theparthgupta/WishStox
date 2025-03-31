import Link from "next/link"
import { ArrowRight, Zap, LineChart, TrendingUp, Briefcase, Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import TestimonialSlider from "@/components/testimonial-slider"
import PricingCard from "@/components/pricing-card"
import ContactForm from "@/components/contact-form"
import MarketTicker from "@/components/market-ticker"
import FinanceChart from "@/components/finance-chart"
import ShootingStars from "@/components/shooting-stars"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#001a0d] to-black text-white">
      {/* Background effects */}
      <ShootingStars />

      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold">WS</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
            WishStox
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-gray-300 hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-gray-300 hover:text-green-400 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-green-400 transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-green-400 transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="hidden md:flex border-green-600/40 text-green-400 hover:bg-green-950/50 hover:border-green-500/60"
              style={{
                borderColor: "rgba(0, 126, 51, 0.4)",
                color: "#00c853",
                backgroundColor: "transparent",
              }}
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none shadow-lg shadow-green-900/30"
              style={{
                background: "linear-gradient(to right, #007e33, #004d25)",
                color: "white",
                border: "none",
                boxShadow: "0 4px 14px 0 rgba(0, 77, 37, 0.3)",
              }}
            >
              Start Trading
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              AI-Powered Stock Trading Signals,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                In Real-Time.
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Leverage AI algorithms to maximize your market potential with actionable insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/signup">
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
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Trading Plan</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Select the plan that best fits your trading style and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Starter"
            price="$29"
            description="Perfect for beginners"
            features={["5 AI trading signals per day", "Basic market analysis", "Email notifications", "24/7 support"]}
            ctaText="Get Started"
            popular={false}
          />
          <PricingCard
            title="Professional"
            price="$99"
            description="For serious traders"
            features={[
              "Unlimited AI trading signals",
              "Advanced market analysis",
              "Real-time notifications",
              "Risk assessment tools",
              "Portfolio optimization",
            ]}
            ctaText="Start Trading"
            popular={true}
          />
          <PricingCard
            title="Enterprise"
            price="$299"
            description="For trading firms"
            features={[
              "Everything in Professional",
              "Custom AI model training",
              "API access",
              "Multi-user accounts",
              "Dedicated account manager",
              "Custom reporting",
            ]}
            ctaText="Contact Sales"
            popular={false}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#001208]/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have questions about our platform? Our team is ready to help you get started.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#000a05]/80 backdrop-blur-sm p-6 rounded-xl border border-green-900/40 hover:border-green-700/40 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-900/40 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email Us</h3>
                    <p className="text-green-400">support@wishstox.ai</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Our support team is available 24/7 to answer your questions and help you get started.
                </p>
              </div>

              <div className="bg-[#000a05]/80 backdrop-blur-sm p-6 rounded-xl border border-green-900/40 hover:border-green-700/40 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-900/40 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Call Us</h3>
                    <p className="text-green-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Speak directly with our trading specialists for personalized assistance.
                </p>
              </div>

              <div className="bg-[#000a05]/80 backdrop-blur-sm p-6 rounded-xl border border-green-900/40 hover:border-green-700/40 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-900/40 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Live Chat</h3>
                    <p className="text-green-400">Available 24/7</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Chat with our AI assistant or connect with a live agent for immediate support.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
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
                  <Link href="#pricing" className="text-gray-400 hover:text-green-400 text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-green-400 text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-gray-400 hover:text-green-400 text-sm">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-gray-400 hover:text-green-400 text-sm">
                    Sign Up
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
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#001a0d]/80 flex items-center justify-center hover:bg-green-900/50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#001a0d]/80 flex items-center justify-center hover:bg-green-900/50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#001a0d]/80 flex items-center justify-center hover:bg-green-900/50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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

