import Image from "next/image";
import Link from "next/link";
import NetflixLogo from "../../public/netflix.svg";
import UserAvatar from "./Avatar";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SearchBar from "./SearchBar";
export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Netflix Home">
          <Image src={NetflixLogo} alt="Netflix Logo" width={110} height={30} priority className="h-7 w-auto"/>
        </Link>
        {!session && (
          <div className="hidden shrink-0 lg:block">
            <p className="whitespace-nowrap text-sm text-white">
              <b>New to Netflix?</b>{" "}
              <span className="text-gray-400">Try 7 days for ₹0.</span>
            </p>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>
        <div className="shrink-0">
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}