import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>© 2024 Hiroyuki Kuromiya. All rights reserved.</div>
        <div>
          <Link href="/terms" className="mr-4 hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="mr-4 hover:underline">
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
