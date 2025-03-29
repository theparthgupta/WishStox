"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  ctaText: string
  popular?: boolean
}

const PricingCard = ({ title, price, description, features, ctaText, popular = false }: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className={`h-full bg-[#000a05]/80 backdrop-blur-sm border-green-900/40 overflow-hidden relative ${
          popular ? "border-green-500/50" : ""
        }`}
      >
        {popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-green-600 text-xs font-bold uppercase py-1 px-3 text-white rounded-bl-lg">Popular</div>
          </div>
        )}

        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-white">{price}</span>
            <span className="text-gray-400 ml-1">/month</span>
          </div>
          <p className="text-gray-400 mt-2">{description}</p>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-1 bg-green-900/40 rounded-full p-1">
                  <Check className="h-3 w-3 text-green-500" />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            className={`w-full ${
              popular
                ? "bg-gradient-to-r from-green-600 to-dark-green-700 hover:from-green-700 hover:to-dark-green-800 text-white"
                : "bg-[#001a0d]/80 hover:bg-[#002a15]/80 text-white"
            }`}
          >
            {ctaText}
          </Button>
        </CardFooter>

        {popular && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-dark-green-700" />
        )}
      </Card>
    </motion.div>
  )
}

export default PricingCard

