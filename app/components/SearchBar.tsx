"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HorizontalLoader from "./Loader";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("query") || ""
  );

  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = value.trim();

    startTransition(() => {
      if (query) {
        router.push(`?query=${encodeURIComponent(query)}`);
      } else {
        router.push("");
      }
    });
  };

  const handleTyping = (value: string) => {
    setValue(value);

    if (!value) {
      startTransition(() => {
        router.push(window.location.pathname);
      });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full justify-end"
    >
      <label htmlFor="search" className="sr-only">
        Search movies
      </label>

      <div className="relative w-full max-w-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 sm:pl-4">
          <svg
            className="h-4 w-4 text-zinc-400 sm:h-5 sm:w-5"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="m21 21-4.2-4.2m2.2-5.3a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          className={`relative rounded-lg p-[2px] transition-all duration-300 sm:rounded-xl ${
            isPending
              ? "animate-pulse bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]"
              : "bg-zinc-700"
          }`}
        >
          <input
            type="search"
            id="search"
            value={value}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Search movies..."
            required
            className="h-9 w-full rounded-[7px] bg-zinc-900 pl-9 pr-20 text-xs text-white shadow-sm outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-red-500/20 sm:h-12 sm:rounded-[10px] sm:pl-11 sm:pr-28 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="absolute right-1 top-1 flex h-7 items-center justify-center rounded-md bg-red-600 px-2.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:right-1.5 sm:top-1.5 sm:h-9 sm:rounded-lg sm:px-4 sm:text-sm"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}