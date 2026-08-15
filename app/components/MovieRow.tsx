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

    const checkScrollable = ()=>{
      console.log(element?.scrollWidth, element?.clientWidth)
      if(element) setControl(element?.scrollWidth > element?.clientWidth)
    }

    const observer = new ResizeObserver(checkScrollable);
    element && observer.observe(element);
    checkScrollable();

    return ()=> observer.disconnect();

  })

  return (
    <div className="relative">
      {showControl && (
        <button onClick={() => scroll("left")} className="absolute h-full left-0 top-1/2 z-20 -translate-y-1/2 bg-black/30 p-3 text-white hover:bg-black/50 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      )}
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[180px] shrink-0">
            <MovieCard movie={movie}/>
          </div>
        ))}
      </div>

      <div>
        {showControl && (
          <button onClick={() => scroll("right")} className="h-full absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-black/30 p-3 text-white hover:bg-black/50 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}