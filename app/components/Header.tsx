import React from 'react';
import { Wallet } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-gray-800/80 bg-gray-900/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-600/20">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Ledger.io</span>
        </div>
        <div className="text-sm text-gray-400 font-medium">Enterprise Dashboard</div>
      </div>
    </header>
  );
}