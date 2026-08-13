import Image from "next/image";
import Link from "next/link";
import NetflixLogo from "../../public/netflix.svg";
import UserAvatar from "./Avatar";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center" aria-label="Netflix Home">
          <Image src={NetflixLogo} alt="Netflix Logo" width={110} height={30} priority className="h-7 w-auto"/>
        </Link>
        {!session && (
          <div>
            <p className="text-sm text-white">
              <b>New to Netflix?</b>{" "}
              <span className="text-gray-300">
                Try 7 days for ₹0.
              </span>
            </p>
          </div>
        )}
        <UserAvatar/>
      </div>
    </nav>
  );
}