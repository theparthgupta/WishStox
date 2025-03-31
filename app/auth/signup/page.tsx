"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SocialAuth from "@/components/social-auth"
import { signUp } from "@/lib/auth"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    let strength = 0
    if (newPassword.length >= 8) strength += 1
    if (/[A-Z]/.test(newPassword)) strength += 1
    if (/[0-9]/.test(newPassword)) strength += 1
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1

    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!email || !password) {
      setErrorMessage("Please provide both email and password.")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      setIsLoading(false)
      return
    }

    try {
      const user = await signUp(email, password)
      if (!user) {
        throw new Error('Account creation failed. Please try again.')
      }
      setSuccessMessage(`Account created successfully! Welcome, ${email}`)
    } catch (error: any) {
      console.error('Signup Error:', error)
      setErrorMessage(error.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-green-900/40 bg-[#000a05]/80 backdrop-blur-sm overflow-hidden relative">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Create an Account</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your details to create your WishStox account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-[#001208] border-green-900/40 text-white placeholder-gray-500 focus:border-green-600 focus:ring-green-600/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="bg-[#001208] border-green-900/40 text-white placeholder-gray-500 focus:border-green-600 focus:ring-green-600/20"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="bg-[#001208] border-green-900/40 text-white placeholder-gray-500 focus:border-green-600 focus:ring-green-600/20"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <SocialAuth />
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-400">
            Already have an account? <Link href="/auth/login" className="text-green-400">Sign in</Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
