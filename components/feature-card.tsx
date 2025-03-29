"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  bgColor?: string
}

const FeatureCard = ({ icon, title, description, bgColor = "from-green-900/30 to-green-900/20" }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div
        className="rounded-lg border overflow-hidden relative h-full p-6"
        style={{
          backgroundColor: "rgba(0, 10, 5, 0.8)",
          borderColor: "rgba(0, 77, 37, 0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(to bottom right, ${
              bgColor.includes("green-900")
                ? "rgba(0, 77, 37, 0.3), rgba(0, 77, 37, 0.2)"
                : bgColor.includes("green-600")
                  ? "rgba(0, 126, 51, 0.3), rgba(0, 77, 37, 0.2)"
                  : "rgba(0, 160, 64, 0.3), rgba(0, 77, 37, 0.2)"
            })`,
          }}
        />

        <div className="mb-6 relative z-10">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2 relative z-10">{title}</h3>
        <p className="text-gray-300 relative z-10">{description}</p>

        <div
          className="absolute bottom-0 left-0 w-full h-1"
          style={{
            background: "linear-gradient(to right, #007e33, #004d25)",
            opacity: 0.7,
          }}
        />
      </div>
    </motion.div>
  )
}

export default FeatureCard

