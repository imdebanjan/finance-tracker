export interface Transaction {
  id: string;
  desc: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}