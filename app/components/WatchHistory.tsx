"use client";

import { useEffect, useState } from "react";
import { type WatchHistory, getContinueWatching } from "../lib/watchHistory";
import WatchHistoryCard from "./MovieHistoryCard";

export default function WatchHistory() {
  const [history, setHistory] = useState<WatchHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getContinueWatching();
        console.log({data});
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

  if (loading) {
    return (
      <section>
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
    return null;
  }

  return (
    <section className="py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Continue Watching
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {history.map((item) => (
          <WatchHistoryCard
            key={item.key}
            item={item}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
}