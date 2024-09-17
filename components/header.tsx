import { getCurrentUser } from "@/libs/firebase/firebase-admin";
import Link from "next/link";
import HamburgerMenu from "@/components/header/HamburgerMenu";
import { FaGithub } from 'react-icons/fa'; // GitHubアイコンをインポート

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
        <div>
          <Link 
            href="https://github.com/kromiii/today-i-learned" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaGithub size={24} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
