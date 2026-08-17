import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import NetflixLogo from "../../public/netflix.svg";
import UserAvatar from "./Avatar";
import SearchBar from "./SearchBar";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface SearchProps{
  isSearch: boolean
}

export default async function NavBar({ isSearch }:SearchProps) {
  const [session] = await Promise.all([
    getServerSession(authOptions),
  ]);
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-2 sm:h-16 sm:gap-4 sm:px-6">
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

        {!session && (
          <div className="hidden shrink-0 lg:block">
            <p className="whitespace-nowrap text-sm text-white">
              <b>New to Netflix?</b>{" "}
              <span className="text-gray-400">
                Try 7 days for ₹0.
              </span>
            </p>
          </div>
        )}

        <div className="min-w-0 flex-1">
          {isSearch && <SearchBar />}
        </div>

        <div className="ml-0 flex shrink-0 items-center">
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}