export class AccountModel {
  date!: string;
  dateValue!: string;

  product!: string;
  isin!: string;

  description!: string;

  exchangeRate!: number;

  value!: number;
  currencyValue!: string;

  balance!: number;
  currencyBalance!: string;

  orderId!: string;

  constructor(data: Partial<AccountModel> = {}) {
    Object.assign(this, data);
  }
}
