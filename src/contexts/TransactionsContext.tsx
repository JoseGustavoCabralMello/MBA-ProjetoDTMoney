import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  price: number;
  type: 'income' | 'outcome';
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({children}: TransactionProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function laodTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    laodTransactions();
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}