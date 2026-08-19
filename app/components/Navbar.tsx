import Image from "next/image";
import Link from "next/link";
import NetflixLogo from "../../public/netflix.svg";
import UserAvatar from "./Avatar";
import SearchBar from "./SearchBar";

interface SearchProps{
  isSearch: boolean
}

export default async function NavBar({ isSearch }:SearchProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center px-2 sm:h-16 sm:px-6">        
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Netflix Home"
        >
          <Image
            src={NetflixLogo}
            alt="Netflix Logo"
            width={110}
            height={30}
            priority
            className="h-5 w-auto sm:h-7"
          />
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {isSearch && (
            <Link
              href="/movies/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.5-4.5m2-5.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                />
              </svg>
            </Link>
          )}

          <UserAvatar />
        </div>
      </div>
    </nav>

  );
}