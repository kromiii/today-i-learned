import { getCurrentUser } from "@/libs/firebase/firebase-admin";
import Link from "next/link";
import HamburgerMenu from "@/components/header/HamburgerMenu";

export default async function Header() {
  const currentUser = await getCurrentUser();

  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {currentUser && <HamburgerMenu />}
          <Link href="/" className="text-white text-2xl font-bold ml-4">
            Today I Learned
          </Link>
        </div>
      </nav>
    </header>
  );
}
