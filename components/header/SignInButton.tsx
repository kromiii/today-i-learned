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
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Get Started
    </button>
  );
}
