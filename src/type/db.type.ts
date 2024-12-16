import { ProductCart } from "../model/product_cart.model";
import { ProductHistory } from "../model/product_history.model";
import { ProductImage } from "../model/product_image.model";
import { ProductType } from "../model/product_type.model";
import { Products } from "../model/products.model";
import { User } from "./../model/user.model";
import { Sequelize } from "sequelize";
export interface IFormDB {
  sequelize?: Sequelize;
  User?: typeof User;
  Products?: typeof Products;
  ProductImage?: typeof ProductImage;
  ProducType?: typeof ProductType;
  ProductHistory?: typeof ProductHistory;
  ProductCart?: typeof ProductCart;
}
