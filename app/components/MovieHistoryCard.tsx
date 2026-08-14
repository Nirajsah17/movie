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
  const watchUrl = item.mediaType === "movie" ? `/watch/${item.mediaId}?type=movie&poster_path=${poster}` : `/watch/${item.mediaId}?type=tv&season=${item.seasonNumber}&episode=${item.episodeNumber}&poster_path=${poster}`;
  const title = item.mediaType === "movie" ? item.title : `${item.title} - S${item.seasonNumber}-EP${item.episodeNumber}`;

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
        <h4 className="white">{item.title}</h4>
        <Image src={poster} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px" className="object-cover transition duration-300 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
          {item.mediaType === "tv" ? "TV" : "Movie"}
        </span>
        <h4 className="absolute bottom-3 left-3 right-3 z-10 line-clamp-2 text-sm font-semibold text-white drop-shadow-lg">{title}</h4>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl">
            <svg className="ml-0.5 h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M6.3 3.5a1 1 0 0 0-1.55.83v11.34a1 1 0 0 0 1.55.83l8.5-5.67a1 1 0 0 0 0-1.66L6.3 3.5Z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-red-600" style={{ width: `${progress}%`}}/>
        </div>
      </Link>
      <button disabled={removing} onClick={handleRemove} aria-label="Remove from watch history" className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur-sm transition hover:bg-red-600 group-hover:opacity-100 disabled:cursor-not-allowed cursor-pointer">
        {removing ? (
          "…"
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        )}
      </button>
    </article>
  );
}