"use client";

import { useRef } from "react";
import { TMDBMovie } from "./MovieCard";
import MovieCard from "./MovieCard";

export default function MovieRow({ movies }: { movies: TMDBMovie[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-4 scrollbar-hide  [scrollbar-width:thin]
        [scrollbar-color:#525252_transparent]
        [&::-webkit-scrollbar]:h-1.5
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:border
        [&::-webkit-scrollbar-track]:border-neutral-800
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-neutral-600
        hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[180px] shrink-0">
            <MovieCard movie={movie}/>
          </div>
        ))}
      </div>

      <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}