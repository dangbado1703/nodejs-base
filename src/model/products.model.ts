import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  CreationOptional,
  DataTypes,
} from 'sequelize';

export class Products extends Model<
  InferAttributes<Products>,
  InferCreationAttributes<Products>
> {
  declare id: string;
  declare name: string;
  declare price: number;
  declare like: number;
  declare sale: CreationOptional<number>;
  declare priceSale: CreationOptional<number>;
  declare typeId: string;
  declare count: number;
  declare purchaseCount: number;
  declare createDate: string;
  declare updateDate: CreationOptional<string>;
  declare createUser: string;
}

const productsModel = (sequelize: Sequelize) => {
  return Products.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createDate: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'create_date',
      },
      createUser: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      priceSale: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'price_sale',
      },
      purchaseCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sale: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      typeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      updateDate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'products',
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
      schema: 'shopping',
    }
  );
};

export default productsModel;
