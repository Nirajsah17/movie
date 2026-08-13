"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || "/";

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">          
          <div className="mb-8 flex justify-center">
            <Image src="/netflix.svg" alt="Netflix" width={150} height={45} priority className="h-auto w-36"/>
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white"> Sign In </h1>
            <p className="mt-2 text-sm text-gray-400"> Sign in to continue watching</p>
          </div>
          <button onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.09A12 12 0 0 0 12 24Z"/>
              <path fill="#FBBC05" d="M5.28 14.29A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.29V6.62H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l4-3.09Z"/>
              <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.81l3.43-3.43C17.95 1.16 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4 3.09C5.23 6.88 7.88 4.77 12 4.77Z"/>
            </svg>
            Continue with Google
          </button>
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-gray-500">
              SECURE LOGIN
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-xs leading-relaxed text-gray-500">
            By continuing, you agree to our Terms of Service
            and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}