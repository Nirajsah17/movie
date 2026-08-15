"use client";

import { useEffect, useRef, useState } from "react";
import { type WatchHistory, getContinueWatching } from "../lib/watchHistory";
import WatchHistoryCard from "./MovieHistoryCard";

export default function WatchHistory() {
  const [history, setHistory] = useState<WatchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getContinueWatching();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load watch history:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const handleRemove = (key: string) => {
    setHistory((current) =>
      current.filter((item) => item.key !== key)
    );
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Continue Watching
        </h2>

        <div className="text-sm text-gray-500">
          Loading...
        </div>
      </section>
    );
  }

  if (history.length === 0) {
    return (
      <section className="px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Continue Watching
        </h2>

        <div className="text-sm text-gray-500">
          Nothing here
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Continue Watching
        </h2>
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-2
            [scrollbar-width:thin]
            [scrollbar-color:#525252_transparent]
            [&::-webkit-scrollbar]:h-1.5
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:border
            [&::-webkit-scrollbar-track]:border-neutral-800
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-neutral-600
            hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          {history.map((item) => (
            <div key={item.key} className="w-[180px] shrink-0 sm:w-[200px] md:w-[220px]">
              <WatchHistoryCard item={item} onRemove={handleRemove}
              />
            </div>
          ))}
        </div>

        <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  );
}