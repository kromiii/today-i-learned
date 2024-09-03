"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/libs/firebase/auth";

export default function SignInButton() {
  const router = useRouter();

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();
    if (isOk) {
      window.location.href = "/chat";
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Sign In
    </button>
  );
}
