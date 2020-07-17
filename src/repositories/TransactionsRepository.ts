import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, cur) => {
        return cur.type === 'income'
          ? { ...acc, income: acc.income + cur.value }
          : { ...acc, outcome: acc.outcome + cur.value };
      },
      { income: 0, outcome: 0, total: 0 },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = { id: uuid(), title, value, type };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
