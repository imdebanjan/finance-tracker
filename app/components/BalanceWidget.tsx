import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface BalanceWidgetProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  formatCurrency: (val: number) => string;
}

export default function BalanceWidget({
  totalBalance,
  totalIncome,
  totalExpense,
  formatCurrency,
}: BalanceWidgetProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Balance</p>
      <h2 className={`text-3xl font-bold tracking-tight transition-colors ${totalBalance < 0 ? 'text-rose-400' : 'text-white'}`}>
        {formatCurrency(totalBalance)}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800/60">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 mb-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Income
          </div>
          <p className="text-base font-semibold text-gray-200">{formatCurrency(totalIncome)}</p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-rose-400 mb-1">
            <ArrowDownLeft className="w-3.5 h-3.5" /> Expenses
          </div>
          <p className="text-base font-semibold text-gray-200">{formatCurrency(totalExpense)}</p>
        </div>
      </div>
    </div>
  );
}