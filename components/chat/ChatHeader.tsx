import React, { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-white p-4 border-b">
      {children}
    </header>
  );
}
