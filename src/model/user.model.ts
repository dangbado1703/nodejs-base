import { Sequelize } from "sequelize";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare user_id: CreationOptional<number>;
  declare username: string;
  declare password: string;
}

const userModel = (sequelize: Sequelize) => {
  return User.init(
    {
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user",
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};

export default userModel;
