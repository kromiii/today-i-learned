import React, { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto p-4">
        {children}
      </div>
    </header>
  );
}
