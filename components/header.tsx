import { getCurrentUser } from "@/libs/firebase/firebase-admin";
import SignOutButton from "./header/SignOutButton";
import SignInButton from "./header/SignInButton";
import Link from "next/link";

export default async function Header() {
  const currentUser = await getCurrentUser();

  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Today I Learned
        </Link>
        <div>
          {currentUser && (
            <>
              <Link href="/chat" className="text-white mr-4">
                Chat
              </Link>
              <Link href="/dashboard" className="text-white mr-4">
                Dashboard
              </Link>
              <SignOutButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
