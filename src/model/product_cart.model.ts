import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class ProductCart extends Model<
  InferAttributes<ProductCart>,
  InferCreationAttributes<ProductCart>
> {
  declare product_id: string;
  declare quantity: number;
}

const productCartModel = (sequelize: Sequelize) => {
  return ProductCart.init(
    {
      product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        field: 'productId',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'product_type',
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
      schema: 'shopping',
    }
  );
};

export default productCartModel;
