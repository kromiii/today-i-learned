"use client";

import { useUserSession } from "@/hooks/use-user-session";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import { createSession, removeSession } from "@/actions/auth-actions";

export function Header({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">Today I Learned</a>
        {!userSessionId ? (
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
                <li><a href="/settings" className="hover:text-indigo-200 transition duration-300">Settings</a></li>
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
