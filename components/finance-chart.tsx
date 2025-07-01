"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const FinanceChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentPrice, setCurrentPrice] = useState(247.85)
  const [priceChange, setPriceChange] = useState(2.34)

  // Use refs for values that shouldn't trigger re-renders
  const priceHistoryRef = useRef<number[]>(
    Array(100)
      .fill(0)
      .map(() => Math.random() * 50 + 220),
  )
  const animationRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const targetPriceRef = useRef<number>(247.85)
  const currentPriceRef = useRef<number>(247.85)
  const minPriceChangeRef = useRef<number>(2.0)

  // Initialize and start animation
  useEffect(() => {
    // Initialize with random data
    const initialPrices = Array(100)
      .fill(0)
      .map(() => Math.random() * 50 + 220)
    priceHistoryRef.current = initialPrices
    const initialPrice = Number.parseFloat(initialPrices[initialPrices.length - 1].toFixed(2))
    setCurrentPrice(initialPrice)
    currentPriceRef.current = initialPrice
    targetPriceRef.current = initialPrice

    // Start the animation
    lastUpdateTimeRef.current = performance.now()

    // Animation function that updates prices and chart data
    const updatePrices = () => {
      const now = performance.now()
      const deltaTime = now - lastUpdateTimeRef.current

      // Generate new target price every 3000ms
      if (deltaTime > 3000) {
        // Generate a random direction (up or down)
        const direction = Math.random() > 0.5 ? 1 : -1

        // Generate a random change amount, at least $2, up to $8
        const changeAmount = (Math.random() * 6 + minPriceChangeRef.current) * direction

        // Set the new target price
        targetPriceRef.current = Math.max(200, Math.min(300, currentPriceRef.current + changeAmount))
        setPriceChange(Number.parseFloat(changeAmount.toFixed(2)))
        lastUpdateTimeRef.current = now
      }

      // Smoothly interpolate current price towards target price
      currentPriceRef.current = currentPriceRef.current + (targetPriceRef.current - currentPriceRef.current) * 0.01
      const displayPrice = Number.parseFloat(currentPriceRef.current.toFixed(2))
      setCurrentPrice(displayPrice)

      // Update price history - shift array and add new price, but do it more slowly
      if (deltaTime % 100 < 16) {
        // 16ms is roughly one frame at 60fps
        const newHistory = [...priceHistoryRef.current.slice(1), currentPriceRef.current]
        priceHistoryRef.current = newHistory
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(updatePrices)
    }

    // Start the animation loop
    animationRef.current = requestAnimationFrame(updatePrices)

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [priceChange])

  // Draw the chart - separate from the data updates
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    // Set canvas dimensions accounting for device pixel ratio
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let renderAnimationId: number

    const renderFrame = () => {
      // Get current price history from ref
      const priceHistory = priceHistoryRef.current

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(0, 100, 50, 0.1)"
      ctx.lineWidth = 0.5

      // Horizontal grid lines
      for (let i = 0; i < 10; i++) {
        const y = (rect.height / 10) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(rect.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i < 12; i++) {
        const x = (rect.width / 12) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, rect.height)
        ctx.stroke()
      }

      // Find min and max prices for scaling
      const minPrice = Math.min(...priceHistory) * 0.98
      const maxPrice = Math.max(...priceHistory) * 1.02
      const priceRange = maxPrice - minPrice

      // Draw line chart with smooth curve
      const isPositive = priceChange >= 0
      ctx.strokeStyle = isPositive ? "#00c853" : "#ff5252"
      ctx.lineWidth = 2
      ctx.beginPath()

      // Draw a smooth curve
      if (priceHistory.length > 0) {
        const firstPoint = {
          x: 0,
          y: rect.height - ((priceHistory[0] - minPrice) / priceRange) * rect.height * 0.8,
        }

        ctx.moveTo(firstPoint.x, firstPoint.y)

        // Use bezier curves for smoother lines
        for (let i = 0; i < priceHistory.length - 1; i++) {
          const current = {
            x: (rect.width / priceHistory.length) * i,
            y: rect.height - ((priceHistory[i] - minPrice) / priceRange) * rect.height * 0.8,
          }

          const next = {
            x: (rect.width / priceHistory.length) * (i + 1),
            y: rect.height - ((priceHistory[i + 1] - minPrice) / priceRange) * rect.height * 0.8,
          }

          // Control points for the bezier curve
          const cp1x = current.x + (next.x - current.x) / 2
          const cp1y = current.y
          const cp2x = current.x + (next.x - current.x) / 2
          const cp2y = next.y

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y)
        }
      }

      ctx.stroke()

      // Add gradient under the line
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
      if (isPositive) {
        gradient.addColorStop(0, "rgba(0, 200, 83, 0.2)")
        gradient.addColorStop(0.5, "rgba(0, 150, 60, 0.1)")
        gradient.addColorStop(1, "rgba(0, 100, 40, 0)")
      } else {
        gradient.addColorStop(0, "rgba(255, 82, 82, 0.2)")
        gradient.addColorStop(0.5, "rgba(200, 60, 60, 0.1)")
        gradient.addColorStop(1, "rgba(150, 40, 40, 0)")
      }

      ctx.fillStyle = gradient
      ctx.beginPath()

      // Start from the bottom left
      ctx.moveTo(0, rect.height)

      // Draw the smooth curve again for the fill
      if (priceHistory.length > 0) {
        const firstPoint = {
          x: 0,
          y: rect.height - ((priceHistory[0] - minPrice) / priceRange) * rect.height * 0.8,
        }

        ctx.lineTo(firstPoint.x, firstPoint.y)

        // Use bezier curves for smoother lines
        for (let i = 0; i < priceHistory.length - 1; i++) {
          const current = {
            x: (rect.width / priceHistory.length) * i,
            y: rect.height - ((priceHistory[i] - minPrice) / priceRange) * rect.height * 0.8,
          }

          const next = {
            x: (rect.width / priceHistory.length) * (i + 1),
            y: rect.height - ((priceHistory[i + 1] - minPrice) / priceRange) * rect.height * 0.8,
          }

          // Control points for the bezier curve
          const cp1x = current.x + (next.x - current.x) / 2
          const cp1y = current.y
          const cp2x = current.x + (next.x - current.x) / 2
          const cp2y = next.y

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y)
        }
      }

      // Complete the path to the bottom right
      ctx.lineTo(rect.width, rect.height)
      ctx.closePath()
      ctx.fill()

      // Draw glowing dots at latest data point
      const lastIndex = priceHistory.length - 1
      const lastX = (rect.width / priceHistory.length) * lastIndex
      const lastY = rect.height - ((priceHistory[lastIndex] - minPrice) / priceRange) * rect.height * 0.8

      // Glow effect
      const glowColor = isPositive ? "rgba(0, 255, 133, 0.8)" : "rgba(255, 82, 82, 0.8)"
      const glow = ctx.createRadialGradient(lastX, lastY, 0, lastX, lastY, 8)
      glow.addColorStop(0, glowColor)
      glow.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(lastX, lastY, 8, 0, Math.PI * 2)
      ctx.fill()

      // Actual dot
      ctx.fillStyle = isPositive ? "#00ff85" : "#ff5252"
      ctx.beginPath()
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2)
      ctx.fill()

      // Continue animation
      renderAnimationId = requestAnimationFrame(renderFrame)
    }

    // Start rendering
    renderAnimationId = requestAnimationFrame(renderFrame)

    // Cleanup function
    return () => {
      cancelAnimationFrame(renderAnimationId)
    }
  }, [priceChange])

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden relative"
      style={{
        backgroundColor: "rgba(0, 10, 5, 0.8)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(0, 77, 37, 0.4)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Price indicator */}
      <div className="absolute bottom-4 left-4 text-xs font-mono">
        <div className={`text-2xl font-bold ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
          ${currentPrice.toFixed(2)}
        </div>
        <div className={`${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
          {priceChange >= 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </div>
      </div>

      {/* Animated data indicator */}
      <div
        className="absolute top-4 right-4 p-2 rounded-lg"
        style={{
          backgroundColor: "rgba(0, 10, 5, 0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0, 77, 37, 0.5)",
        }}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className={`w-2 h-2 rounded-full ${priceChange >= 0 ? "bg-green-500" : "bg-red-500"}`}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-white text-xs">LIVE</span>
        </motion.div>
      </div>
    </div>
  )
}

export default FinanceChart

