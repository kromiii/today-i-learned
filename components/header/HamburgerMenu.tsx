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
      <button onClick={toggleMenu} className="text-white">
        ☰
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link
            href="/chat"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Chat
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <SignOutButton 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" 
            onClick={closeMenu}
          />
        </div>
      )}
    </div>
  );
}
