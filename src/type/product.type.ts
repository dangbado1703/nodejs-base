import { ProductType } from '../model/product_type.model';
import { ProductTypeBuilder } from '../patterns/productType.builder';

export type TBodyCreateProduct = {
  id: string;
  name: string;
  price: number;
  like: number;
  sale: number;
  priceSale: number;
  typeId: string;
  count: number;
  purchaseCount: number;
  createDate: string;
  updateDate: string;
  createUser: string;
  file: File;
};

export type TProductListValidate = {
  name: keyof TBodyCreateProduct;
  value: any;
  required: boolean;
};

export interface IProductType {
  setName(name: string): ProductTypeBuilder;
  setId(id: string): ProductTypeBuilder;
  excuteCreate(): Promise<ProductType>;
  excuteUpdate(): Promise<[affectedCount: number]>;
  excuteDelete(): Promise<number>;
}
