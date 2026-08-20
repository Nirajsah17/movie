"use client";

import { useEffect, useRef, useState } from "react";
import { TMDBMovie } from "./MovieCard";
import MovieCard from "./MovieCard";

export default function MovieRow({ movies }: { movies: TMDBMovie[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControl, setControl] = useState(false);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    
    scrollRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };
  
  useEffect(()=>{
    const element = scrollRef.current;
    if(!element) return
    element.scroll(50, 0)
    const checkScrollable = ()=>{
      // if(element) setControl(element?.scrollWidth > element?.clientWidth)

    }

    const observer = new ResizeObserver(checkScrollable);
    element && observer.observe(element);
    checkScrollable();

    return ()=> observer.disconnect();

  })

  return (
  <div className="relative w-full">
    {showControl && (
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80 sm:left-2 sm:h-10 sm:w-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    )}

    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
    >
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="w-[125px] shrink-0 sm:w-[150px] md:w-[170px] lg:w-[180px]"
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>

    {showControl && (
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80 sm:right-2 sm:h-10 sm:w-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7-7"
          />
        </svg>
      </button>
    )}
  </div>
  );
}