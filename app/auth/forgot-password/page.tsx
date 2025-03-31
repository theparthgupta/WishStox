"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function sendPasswordReset(email: string) {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to send reset link")
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong")
    } else {
      throw new Error("An unknown error occurred")
    }
  }
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string

    try {
      await sendPasswordReset(email)
      setIsSubmitted(true)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
     finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-green-900/40 bg-[#000a05]/80 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-green-900/5 pointer-events-none" />

          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Reset Password</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your email and we&apos;ll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-gray-300 mb-6">
                  We&apos;ve sent a password reset link to your email address. Please check your inbox.
                </p>
                <Link href="/auth/login">
                  <Button className="bg-green-700 text-white">Back to Login</Button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    className="bg-[#001208] border-green-900/40 text-white focus:border-green-600 focus:ring-green-600/20"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button type="submit" disabled={isLoading} className="w-full bg-green-700 text-white">
                  {isLoading ? (
                    <span>Sending...</span>
                  ) : (
                    <span>Send Reset Link <ArrowRight className="ml-2 h-4 w-4" /></span>
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Link href="/auth/login" className="text-green-400 hover:text-green-300 font-medium transition-colors inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}