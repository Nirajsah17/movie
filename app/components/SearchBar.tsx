"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [value, setValue] = useState(searchParams.get("query") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (value.trim()) {
      router.push(`?query=${encodeURIComponent(value.trim())}`);
    } else {
      router.push("");
    }
  };

  const handleTyping = (value:string)=>{
    setValue(value);
    if(!value){
      router.back();
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full justify-end mr-4">
      <label htmlFor="search" className="sr-only">
        Search movies
      </label>

      <div className="relative w-full max-w-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="h-5 w-5 text-zinc-400" aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="m21 21-4.2-4.2m2.2-5.3a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <input type="search" id="search" value={value} onChange={(e) => handleTyping(e.target.value)} placeholder="Search movies, TV shows..." required className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-11 pr-24 text-sm text-white shadow-sm outline-none placeholder:text-zinc-500 transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"/>
        <button type="submit" className="absolute right-1.5 top-1.5 flex h-9 items-center gap-1.5 rounded-lg bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 active:bg-red-800 cursor-pointer">
          Search
        </button>
      </div>
    </form>
  );
}
