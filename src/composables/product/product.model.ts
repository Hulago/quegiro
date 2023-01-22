export class ProductModel {
  isin!: string;
  name!: string;
  exchange!: string;
  categoryId!: string | null;

  constructor(data: Partial<ProductModel> = {}) {
    Object.assign(this, data);
  }
}
