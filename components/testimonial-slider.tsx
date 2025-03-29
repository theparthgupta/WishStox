"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Day Trader",
    content:
      "The AI signals have completely transformed my trading strategy. I've seen a 43% increase in my portfolio since I started using WishStox.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    stats: {
      returns: "+43%",
      trades: "156",
      winRate: "78%",
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Investment Analyst",
    content:
      "As a professional analyst, I was skeptical at first. But the predictive accuracy of WishStox AI has impressed even the most experienced traders on our team.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    stats: {
      returns: "+28%",
      trades: "342",
      winRate: "81%",
    },
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Retail Investor",
    content:
      "I'm new to trading, and WishStox has given me the confidence to make informed decisions. The risk management tools are especially helpful.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    stats: {
      returns: "+19%",
      trades: "87",
      winRate: "72%",
    },
  },
]

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-green-400" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute inset-0 flex items-center justify-between z-10 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-slate-900/50 backdrop-blur-sm text-white hover:bg-green-500/20 pointer-events-auto"
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-slate-900/50 backdrop-blur-sm text-white hover:bg-green-500/20 pointer-events-auto"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="overflow-hidden relative rounded-xl bg-[#000a05]/80 backdrop-blur-sm border border-green-500/20 p-8 md:p-12">
        <div className="absolute top-6 right-6 text-green-400 opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="md:flex items-center gap-8"
          >
            <div className="mb-8 md:mb-0 md:w-1/3 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-green-500/50 relative">
                <img
                  src={testimonials[current].avatar || "/placeholder.svg"}
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-900/20" />
              </div>
              <h4 className="text-xl font-semibold text-white text-center">{testimonials[current].name}</h4>
              <p className="text-green-400 text-center mb-2">{testimonials[current].role}</p>
              <div className="flex mb-4">{renderStars(testimonials[current].rating)}</div>

              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-[#000a05]/80 p-2 rounded-lg border border-green-500/20 text-center">
                  <p className="text-xs text-gray-400">Returns</p>
                  <p className="text-green-400 font-bold">{testimonials[current].stats.returns}</p>
                </div>
                <div className="bg-[#000a05]/80 p-2 rounded-lg border border-green-500/20 text-center">
                  <p className="text-xs text-gray-400">Trades</p>
                  <p className="text-white font-bold">{testimonials[current].stats.trades}</p>
                </div>
                <div className="bg-[#000a05]/80 p-2 rounded-lg border border-green-500/20 text-center">
                  <p className="text-xs text-gray-400">Win Rate</p>
                  <p className="text-green-400 font-bold">{testimonials[current].stats.winRate}</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <p className="text-xl md:text-2xl text-gray-200 relative z-10 leading-relaxed">
                "{testimonials[current].content}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-dark-green-700 opacity-70" />
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-green-500" : "bg-slate-700"} transition-colors`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider

