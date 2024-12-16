import { Sequelize } from 'sequelize';
import userModel from '../model/user.model';
import { IFormDB } from '../type/db.type';
import productImageModel from '../model/product_image.model';
import productsModel from '../model/products.model';
import productTypeModel from '../model/product_type.model';
import productCartModel from '../model/product_cart.model';
import productHistoryModel from '../model/product_history.model';

export class Database {
  private static instance: Database;
  public sequelize: Sequelize;
  public db: IFormDB;
  private static connectionCount = 0;
  private constructor() {
    const USER_NAME = process.env.USER_NAME as string;
    const PASSWORD = process.env.PASSWORD as string;
    const PORT = process.env.DB_PORT || '3002';
    this.sequelize = new Sequelize('shopping', USER_NAME, PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      port: parseInt(PORT),
    });
    Database.connectionCount++;
    console.log('count:::', Database.connectionCount);
    this.db = {
      sequelize: this.sequelize,
      User: userModel(this.sequelize),
      ProductImage: productImageModel(this.sequelize),
      Products: productsModel(this.sequelize),
      ProducType: productTypeModel(this.sequelize),
      ProductCart: productCartModel(this.sequelize),
      ProductHistory: productHistoryModel(this.sequelize),
    };
  }
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
      Database.instance.authenticate();
    }
    return Database.instance;
  }
  private async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log('Kết nối thành công !');
    } catch (error) {
      console.error('Kết nối không thành công::', error);
    }
  }
}

// const USER_NAME = process.env.USER_NAME as string;
// const PASSWORD = process.env.PASSWORD as string;
// const PORT = process.env.DB_PORT || '3002';
// const sequelize = new Sequelize('shopping', USER_NAME, PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: parseInt(PORT),
// });

// async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Kết nối thành công !');
//   } catch (error) {
//     console.error('Kết nối không thành công::', error);
//   }
// };

// const db: IFormDB = {};
// db.sequelize = sequelize;
// db.User = userModel(sequelize);
// db.ProductImage = productImageModel(sequelize);
// db.Products = productsModel(sequelize);
// db.ProducType = productTypeModel(sequelize);
// db.ProductCart = productCartModel(sequelize);
// db.ProductHistory = productHistoryModel(sequelize);
// export default db;
