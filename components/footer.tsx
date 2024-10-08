import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <a
            href="https://forms.gle/3wQ1PA9r7Vc9fYBm8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
