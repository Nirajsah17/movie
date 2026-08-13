"use client";

import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Enterprise Dashboard</h1>
      <p>Please sign in to access your secure enterprise account.</p>
      <button 
        onClick={() => signIn("google")} 
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Sign in with Google
      </button>
    </main>
  );
}
