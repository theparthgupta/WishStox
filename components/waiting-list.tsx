"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function WaitingList() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/waiting-list")
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/waiting-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    setSubmitted(true);
    setCount(data.count);
  }

  if (submitted) {
    return (
      <section className="w-full px-4 py-12 flex flex-col items-center justify-center bg-transparent">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-center bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-xl mb-8 leading-tight">
            Thank you!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl mb-6 font-medium">
            You&apos;ve been added to the waiting list. We&apos;ll keep you updated!
          </p>
          {count && (
            <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mt-2 font-medium">
              Join <b>{count}</b> others on the waiting list!
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 py-12 flex flex-col items-center justify-center bg-transparent">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-center bg-gradient-to-r from-gray-100 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-xl mb-8 leading-tight">
          Join the waitlist
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 text-center max-w-2xl mb-10 font-medium">
          Welcome to WishStox, the next-gen AI-powered trading platform. Get early access to powerful signals, analytics, and a vibrant trading community. Sign up below to secure your spot!
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
          <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-black/70 border border-gray-700 rounded-2xl px-8 py-5 text-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold px-12 py-5 rounded-2xl shadow-xl hover:from-green-600 hover:to-green-800 transition-all text-2xl min-w-[180px]"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join"}
            </Button>
          </div>
          {error && <div className="text-red-400 text-base text-center w-full max-w-2xl">{error}</div>}
          {count !== null && (
            <div className="text-gray-400 text-base text-center w-full max-w-2xl mt-2">
              <b>{count}</b> people have already joined the waiting list!
            </div>
          )}
        </form>
      </div>
    </section>
  );
} 