import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-900/60 bg-gray-950/40 py-6 text-center text-xs text-gray-500 tracking-wide mt-12">
      <p>&copy; 2026 Ledger Inc. All rights reserved.</p>
      <p className="mt-1 text-gray-600">
        App Design & Frontend Engineering by{' '}
        <span className="text-indigo-400/80 font-medium">debanjanc</span>™
      </p>
    </footer>
  );
}