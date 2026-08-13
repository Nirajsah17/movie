"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  deleteWatchHistory,
  type WatchHistory,
} from "@/app/lib/watchHistory";

interface WatchHistoryCardProps {
  item: WatchHistory;
  onRemove?: (key: string) => void;
}

export default function WatchHistoryCard({
  item,
  onRemove,
}: WatchHistoryCardProps) {
  const [removing, setRemoving] = useState(false);
  const progress = item.duration > 0 ? Math.min((item.progress / item.duration) * 100, 100) : 0;
  const poster = item.posterPath ? `https://image.tmdb.org/t/p/w500${item.posterPath}` : "https://placehold.co/300x450?text=No+Poster";
  const watchUrl = item.mediaType === "movie" ? `/watch/${item.mediaId}?type=movie` : `/watch/${item.mediaId}?type=tv&season=${item.seasonNumber}&episode=${item.episodeNumber}`;

  const handleRemove = async () => {
    try {
      setRemoving(true);

      await deleteWatchHistory(item.key);

      onRemove?.(item.key);
    } catch (error) {
      console.error("Failed to remove watch history:", error);
      setRemoving(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-lg bg-zinc-900">
      <Link href={watchUrl} className="relative block aspect-[2/3] overflow-hidden">
        <Image src={poster} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px" className="object-cover transition duration-300 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
          {item.mediaType === "tv" ? "TV" : "Movie"}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl">
            <span className="ml-0.5 text-lg">▶</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-red-600" style={{ width: `${progress}%`}}/>
        </div>
      </Link>
      <button
        type="button"
        disabled={removing}
        onClick={handleRemove}
        aria-label="Remove from watch history"
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-xs text-white opacity-0 backdrop-blur-sm transition hover:bg-red-600 group-hover:opacity-100">
        {removing ? "…" : "×"}
      </button>
    </article>
  );
}