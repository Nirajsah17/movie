"use client";

import { useEffect, useRef, useState } from "react";
import { type WatchHistory, getContinueWatching } from "../lib/watchHistory";
import WatchHistoryCard from "./MovieHistoryCard";
import Link from "next/link";

interface historyProps{
  isHome: boolean;
}

export default function WatchHistory({ isHome = false }: historyProps) {
  const [history, setHistory] = useState<WatchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControl, setControl] = useState(false);
  useEffect(() => {
    const element = scrollRef.current;
    const checkScrollable = ()=>{
      if(element) setControl(element?.scrollWidth > element?.clientWidth)
    }

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

    const observer = new ResizeObserver(checkScrollable);
    element && observer.observe(element);

    loadHistory();
    checkScrollable();
    return ()=> observer.disconnect();
  }, [loading]);

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

  if (history.length === 0 && isHome) {
    return
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
        <div className="mt-4 text-xl font-bold text-white">
          <Link href="/movies" className="flex h-9 items-center justify-center rounded-lg bg-red-600 px-3 text-sm font-medium text-white shadow-sm hover:bg-red-700">Watch</Link>
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
        {showControl && (
          <button onClick={() => scroll("left")} className="absolute h-full left-0 top-1/2 z-10 -translate-y-1/2 bg-black/30 p-3 text-white hover:bg-black/50 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
          {history.reverse().map((item) => (
            <div key={item.key} className="w-[180px] shrink-0">
              <WatchHistoryCard item={item} onRemove={handleRemove}
              />
            </div>
          ))}
        </div>
        {showControl && (
          <button onClick={() => scroll("right")} className="absolute h-full right-0 top-1/2 z-10 -translate-y-1/2 bg-black/30 p-3 text-white hover:bg-black/50 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}