import Image from "next/image";
import Link from "next/link";
import NetflixLogo from "../../public/netflix.svg";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center" aria-label="Netflix Home">
          <Image src={NetflixLogo} alt="Netflix Logo" width={110} height={30} priority className="h-7 w-auto"/>
        </Link>
        <div>
          <p className="text-sm text-white">
            <b>New to Netflix?</b>{" "}
            <span className="text-gray-300">
              Try 7 days for ₹0.
            </span>
          </p>
        </div>
      </div>
    </nav>
  );
}