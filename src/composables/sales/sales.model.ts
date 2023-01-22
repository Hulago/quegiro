export class SalesModel {
  sellDate!: Date | string | null;
  sellOrderId!: string;

  buyDate!: Date | string | null;
  buyOrderId!: string | null;

  isin!: string;
  name!: string;
  exchange!: string;

  qty!: number;

  buyPrice!: number;
  sellPrice!: number;

  totalBuyPrice!: number;
  totalSellPrice!: number;

  cost!: number;
  currency!: string;

  constructor(data: Partial<SalesModel> = {}) {
    Object.assign(this, data);
  }
}
