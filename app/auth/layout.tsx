import type { ReactNode } from "react"
import Link from "next/link"
import {ShootingStars} from "@/components/shooting-stars"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#001a0d] to-black text-white flex flex-col">
      {/* Background effects */}
      <ShootingStars />

      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold">WS</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
            WishStox
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} WishStox AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

