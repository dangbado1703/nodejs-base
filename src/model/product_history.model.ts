import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class ProductHistory extends Model<
  InferAttributes<ProductHistory>,
  InferCreationAttributes<ProductHistory>
> {
  declare user_id: string;
  declare message: string;
  declare create_date: string;
}

const productHistoryModel = (sequelize: Sequelize) => {
  return ProductHistory.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      create_date: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product_history",
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
      schema: "shopping",
    },
  );
};

export default productHistoryModel;
