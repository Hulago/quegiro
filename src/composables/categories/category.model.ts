export class CategoryModel {
  categoryId!: string;
  name!: string;

  constructor(data: Partial<CategoryModel> = {}) {
    Object.assign(this, data);
  }
}
