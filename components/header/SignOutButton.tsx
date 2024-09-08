'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from "@/libs/firebase/auth";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 追加のプロップがあればここに定義
}

export default function SignOutButton({ className, ...props }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const isOk = await signOut();
    if (isOk) {
      window.location.href = '/';
    }
  };

  return (
    <button
    className={`text-gray-700 hover:text-gray-900 ${className}`}
    {...props}
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}
