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
  const velocityRef = useRef(0.01)
  const lastTrendChangeRef = useRef(performance.now())
  const lastUpdateRef = useRef(performance.now())

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
    lastTrendChangeRef.current = performance.now()
    lastUpdateRef.current = performance.now()

    // Animation function that updates prices and chart data
    const updatePrices = () => {
      const now = performance.now()

      // Only update every 40ms for realism (was 80)
      if (now - lastUpdateRef.current > 40) {
        // Smoother, more realistic price movement
        const t = now / 1000;
        const sine = Math.sin(t * 0.5) * 0.2; // slow, subtle oscillation
        const noise = (Math.random() - 0.5) * 0.05; // smaller noise
        velocityRef.current += noise + sine * 0.01;
        velocityRef.current = Math.max(Math.min(velocityRef.current, 0.7), -0.7);

        // Update price
        currentPriceRef.current = currentPriceRef.current + velocityRef.current;
        // Bounce at boundaries
        if (currentPriceRef.current <= 200 || currentPriceRef.current >= 300) {
          velocityRef.current = -velocityRef.current * 0.7; // reverse and dampen
          currentPriceRef.current = Math.max(200, Math.min(300, currentPriceRef.current));
        }
        setCurrentPrice(Number.parseFloat(currentPriceRef.current.toFixed(2)));
        setPriceChange(velocityRef.current);

        // Moving average for smoothness
        const prev = priceHistoryRef.current[priceHistoryRef.current.length - 1] || currentPriceRef.current;
        const prev2 = priceHistoryRef.current[priceHistoryRef.current.length - 2] || currentPriceRef.current;
        const smoothPrice = (currentPriceRef.current + prev + prev2) / 3;
        const newHistory = [...priceHistoryRef.current.slice(1), smoothPrice];
        priceHistoryRef.current = newHistory;

        lastUpdateRef.current = now;
      }

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
  }, [])

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

    // Helper: Catmull-Rom to Bezier for smooth lines
    function drawSmoothLine(ctx: CanvasRenderingContext2D, points: {x: number, y: number}[]) {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    }

    const renderFrame = () => {
      // Get current price history from ref
      const priceHistory = priceHistoryRef.current

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw grid lines (lighter, modern)
      ctx.strokeStyle = "rgba(255,255,255,0.07)"
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

      // Build points array for Catmull-Rom
      const points = priceHistory.map((price, i) => ({
        x: (rect.width / priceHistory.length) * i,
        y: rect.height - ((price - minPrice) / priceRange) * rect.height * 0.8,
      }));

      // Draw line chart with Catmull-Rom spline
      const isPositive = priceChange >= 0
      ctx.save();
      ctx.strokeStyle = isPositive ? "#00c853" : "#ff5252";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = isPositive ? "#38bdf8aa" : "#f472b6aa";
      ctx.shadowBlur = 10;
      drawSmoothLine(ctx, points);
      ctx.stroke();
      ctx.restore();

      // Add modern blue/teal gradient under the line
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
      gradient.addColorStop(0, "rgba(56,189,248,0.18)") // cyan-400
      gradient.addColorStop(1, "rgba(16,185,129,0.05)") // emerald-500

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(0, rect.height)
      // Draw the smooth curve again for the fill
      if (points.length > 0) {
        ctx.lineTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i === 0 ? i : i - 1];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
      }
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

