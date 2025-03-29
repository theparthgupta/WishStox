"use client"
import { motion } from "framer-motion"

const ShootingStar = ({ delay = 0, duration = 2, left = "50%" }) => {
  return (
    <motion.div
      className="absolute w-[1px] h-[80px] bg-gradient-to-b from-transparent via-green-500 to-green-300"
      style={{ left, top: "-80px", opacity: 0 }}
      animate={{
        y: ["0vh", "100vh"],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        delay,
        repeatDelay: Math.random() * 5 + 5,
      }}
    />
  )
}

const ShootingStars = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <ShootingStar delay={0} duration={2.5} left="15%" />
      <ShootingStar delay={1.5} duration={3} left="25%" />
      <ShootingStar delay={3} duration={2.2} left="40%" />
      <ShootingStar delay={2} duration={2.8} left="60%" />
      <ShootingStar delay={0.5} duration={3.2} left="75%" />
      <ShootingStar delay={4} duration={2.4} left="85%" />
      <ShootingStar delay={5} duration={2.6} left="92%" />
    </div>
  )
}

export default ShootingStars

