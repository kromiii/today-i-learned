"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-white p-2 focus:outline-none"
        aria-label="メニュー"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href="/chat"
            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Chat
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <SignOutButton
            className="block w-full text-left px-4 py-3 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={closeMenu}
          />
        </div>
      )}
    </div>
  );
}
