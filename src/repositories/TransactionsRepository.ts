import Transaction from '../models/Transaction';

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
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    const income = this.getTotalIncome();
    const outcome = this.getTotalOutcome();
    const total = this.getTotal();

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private sum(type: 'income' | 'outcome'): number {
    const total = this.transactions
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return total;
  }

  private getTotalIncome(): number {
    const income = this.sum('income');
    return income;
  }

  private getTotalOutcome(): number {
    const outcome = this.sum('outcome');
    return outcome;
  }

  private getTotal(): number {
    const income = this.sum('income');
    const outcome = this.sum('outcome');

    const total = income - outcome;

    return total;
  }
}

export default TransactionsRepository;
