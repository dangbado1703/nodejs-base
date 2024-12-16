import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class ProductImage extends Model<
  InferAttributes<ProductImage>,
  InferCreationAttributes<ProductImage>
> {
  declare productId: string;
  declare name: string;
  declare image: string;
}

const productImageModel = (sequelize: Sequelize) => {
  return ProductImage.init(
    {
      productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        field: 'product_id',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'product_image',
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
      schema: 'shopping',
    }
  );
};

export default productImageModel;
