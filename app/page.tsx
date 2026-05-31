'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Filter, Activity, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import BalanceWidget from './components/BalanceWidget';

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('Salary');
  const [filter, setFilter] = useState('all');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ledger_next_txs');
    if (saved) setTransactions(JSON.parse(saved));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('ledger_next_txs', JSON.stringify(transactions));
    }
  }, [transactions, isHydrated]);

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim() || !amount) return;

    const newTx: Transaction = {
      id: crypto.randomUUID(),
      desc: desc.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    setTransactions([newTx, ...transactions]);
    setDesc('');
    setAmount('');
  };

  const filteredTransactions = transactions.filter((t) => filter === 'all' || t.category === filter);
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  if (!isHydrated) return <div className="min-h-screen bg-[#0b0f19]" />;

  return (
    <div className="bg-[#0b0f19] text-gray-100 min-h-screen flex flex-col justify-between antialiased selection:bg-indigo-500/30">
      <Header />

      <main className="max-w-5xl w-full mx-auto px-6 py-10 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <BalanceWidget 
            totalBalance={totalBalance} 
            totalIncome={totalIncome} 
            totalExpense={totalExpense} 
            formatCurrency={formatCurrency} 
          />

          <div className="bg-gray-900/20 border border-gray-800/60 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-4">New Transaction</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                <input 
                  type="text" required value={desc} onChange={(e) => setDesc(e.target.value)}
                  placeholder="e.g., AWS Server Bills" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Amount ($)</label>
                  <input 
                    type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors">
                  <option value="Salary">Salary</option>
                  <option value="Food">Food & Dining</option>
                  <option value="Rent">Rent & Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Investments">Investments</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/10 flex justify-center items-center gap-2">
                <Plus className="w-4 h-4" /> Add Transaction
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400">Transaction Ledger</h3>
            <div className="flex items-center gap-2 bg-gray-900/30 px-3 py-1.5 rounded-lg border border-gray-800/40">
              <Filter className="w-3.5 h-3.5 text-gray-500" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-transparent border-none text-xs font-medium text-gray-400 focus:outline-none cursor-pointer">
                <option value="all">All Categories</option>
                <option value="Salary">Salary</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Investments">Investments</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-800/80 rounded-2xl bg-gray-900/10">
                <Activity className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No matching data ledger metrics found.</p>
              </div>
            ) : (
              filteredTransactions.map((tx) => {
                const isIncome = tx.type === 'income';
                return (
                  <div key={tx.id} className="group flex items-center justify-between bg-gray-900/20 hover:bg-gray-900/40 border border-gray-800/40 rounded-xl p-4 transition-all duration-200">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-lg text-sm ${isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {isIncome ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200 group-hover:text-white">{tx.desc}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-gray-800/80 text-gray-400 px-2 py-0.5 rounded-full font-medium">{tx.category}</span>
                          <span className="text-[10px] text-gray-500">{tx.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-semibold ${isIncome ? 'text-emerald-400' : 'text-gray-300'}`}>
                        {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                      <button 
                        onClick={() => setTransactions(transactions.filter((t) => t.id !== tx.id))} 
                        className="text-gray-600 hover:text-rose-400 transition-colors p-1 rounded-md opacity-0 group-hover:opacity-100 target:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}