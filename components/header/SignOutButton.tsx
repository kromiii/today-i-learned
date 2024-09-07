'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from "@/libs/firebase/auth";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const isOk = await signOut();
    if (isOk) {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white hover:underline px-4 py-2 transition duration-300 ease-in-out"
    >
      Sign Out
    </button>
  );
}
