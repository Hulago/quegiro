export class TransactionModel {
  date!: string;
  time!: string;

  transactionDate!: Date;

  isin!: string;
  name!: string;

  exchange!: string;
  exchangeFrom!: string;

  isSale!: boolean;
  isBuy!: boolean;

  qty!: number;
  remain!: number;

  localTransactionCurrency!: string;
  localTransactionPrice!: number;

  localTotalTransactionPrice!: number;
  localTotalTransactionCurrency!: string;

  exchangeRate!: number;

  transactionCurrency!: string;
  transactionPrice!: number;

  transactionCost!: number;
  transactionCostCurrency!: string;

  totalTransactionPrice!: number;
  totalTransactionCurrency!: string;

  orderId!: string;
  state!: string;

  constructor(data: Partial<TransactionModel> = {}) {
    Object.assign(this, data);
  }
}
