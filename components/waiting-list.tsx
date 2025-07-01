"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WaitingList() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [spot, setSpot] = useState<number | null>(null);
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
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    setSubmitted(true);
    setCount(data.count);
    setSpot(data.spot);
  }

  if (submitted) {
    return (
      <div className="bg-green-900/20 border border-green-700 rounded-xl p-8 text-center max-w-md w-full">
        <h3 className="text-2xl font-bold text-green-400 mb-2">Thank you!</h3>
        <p className="text-gray-200 mb-2">You've been added to the waiting list. We'll keep you updated!</p>
        {count && <p className="text-gray-400 mt-2">Join <b>{count}</b> others on the waiting list!</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#000a05]/80 border border-green-900/40 rounded-xl p-8 flex flex-col gap-4 max-w-md w-full shadow-lg">
      <input
        type="text"
        placeholder="Your Name (optional)"
        className="bg-black/40 border border-green-900/40 rounded px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="bg-black/40 border border-green-900/40 rounded px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-2 rounded shadow hover:from-green-700 hover:to-green-800 transition-all" disabled={loading}>
        {loading ? "Joining..." : "Join Waiting List"}
      </Button>
      {count !== null && (
        <div className="text-gray-400 text-sm text-center mt-2">
          <b>{count}</b> people have already joined the waiting list!
        </div>
      )}
    </form>
  );
} 