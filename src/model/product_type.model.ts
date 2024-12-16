import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class ProductType extends Model<
  InferAttributes<ProductType>,
  InferCreationAttributes<ProductType>
> {
  declare id: string;
  declare name: string;
}

const productTypeModel = (sequelize: Sequelize) => {
  return ProductType.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product_type",
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
      schema: "shopping",
    },
  );
};

export default productTypeModel;
