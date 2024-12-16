import productTypeModel, { ProductType } from '../model/product_type.model';
import { IProductType } from '../type/product.type';

export class ProductTypeBuilder implements IProductType {
  private id: string = '';
  private name: string = '';
  private productTypeModel: typeof ProductType;

  constructor() {
    this.productTypeModel = ProductType;
  }

  public setId(id: string): ProductTypeBuilder {
    this.id = id;
    return this;
  }
  public setName(name: string): ProductTypeBuilder {
    this.name = name;
    return this;
  }
  public async excuteCreate() {
    return await this.productTypeModel.create({ id: this.id, name: this.name });
  }

  public async excuteUpdate() {
    return await this.productTypeModel.update(
      { name: this.name },
      { where: { id: this.id } }
    );
  }

  public async excuteDelete() {
    return await this.productTypeModel.destroy({ where: { id: this.id } });
  }
  public async excuteFindOneById() {
    return await this.productTypeModel.findOne({ where: { id: this.id } });
  }
  public async excuteFindOneByName() {
    return await this.productTypeModel.findOne({ where: { name: this.name } });
  }
}
