"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { signInWithGoogle, signOut } from "@/libs/firebase/auth";

export function Header({ isAuthenticatedPromise }: { isAuthenticatedPromise: Promise<boolean> }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    isAuthenticatedPromise.then(auth => {
      setIsAuthenticated(auth);
    });
  }, [isAuthenticatedPromise]);

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();
    if (isOk) {
      setIsAuthenticated(true);
      router.push("/chat");
    }
  };

  const handleSignOut = async () => {
    const isOk = await signOut();
    if (isOk) {
      setIsAuthenticated(false);
      router.push("/");
    }
  };
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // または適切なローディング表示
  }

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">Today I Learned</a>
        {!isAuthenticated ? (
          <button 
            onClick={handleSignIn}
            className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition duration-300"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/chat" className="hover:text-indigo-200 transition duration-300">Chat</a></li>
                <li><a href="/dashboard" className="hover:text-indigo-200 transition duration-300">Dashboard</a></li>
              </ul>
            </nav>
            <button 
              onClick={handleSignOut}
              className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
