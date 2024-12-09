import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SeachForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
  id: number;
  description: string;
  price: number;
  type: 'income' | 'outcome';
  category: string;
  createdAt: string;
}

export function Transaction() {
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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                    {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}