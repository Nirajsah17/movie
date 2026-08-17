"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { initWatchHistoryDB } from "@/app/lib/watchHistory";

export default function UserAvatar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-800" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
      >
        Sign In
      </Link>
    );
  }

  const name = session.user.name || "User";
  const email = session.user.email || "";
  const image = session.user.image;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[#E50914]/70 focus:ring-offset-2 focus:ring-offset-black"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open user menu"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10 sm:h-10 sm:w-10"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914] text-sm font-bold text-white shadow-sm sm:h-10 sm:w-10">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[calc(100vw-16px)] max-w-56 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-2xl sm:top-[calc(100%+10px)]"
          role="menu"
        >
          <div className="border-b border-white/10 px-4 py-3">
            <p className="truncate text-sm font-semibold text-white">
              {name}
            </p>

            <p className="truncate text-xs text-gray-400">
              {email}
            </p>
          </div>

          <div className="p-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex min-h-10 items-center rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20"
              role="menuitem"
            >
              Home
            </Link>

            <Link
              href="/movies"
              onClick={() => setOpen(false)}
              className="flex min-h-10 items-center rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20"
              role="menuitem"
            >
              Movies
            </Link>

            <Link
              href="/history"
              onClick={() => setOpen(false)}
              className="flex min-h-10 items-center rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20"
              role="menuitem"
            >
              History
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex min-h-10 w-full cursor-pointer items-center rounded-md px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-500/30"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function InitWatchHistory() {
  useEffect(() => {
    initWatchHistoryDB();
  }, []);

  return null;
}