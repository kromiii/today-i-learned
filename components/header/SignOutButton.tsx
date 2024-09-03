'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from "@/libs/firebase/auth";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const isOk = await signOut();
    if (isOk) {
      window.location.href = '/'; // Redirect to the home page after sign out
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Sign Out
    </button>
  );
}
