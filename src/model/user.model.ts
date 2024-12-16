import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare create_date: string;
  declare update_date: CreationOptional<string>;
}

export abstract class UserModel {
  protected id: string = '';
  protected email: string = '';
  protected password: string = '';
  protected name: string = '';
  protected createDate: string = '';
  protected updateDate?: string;
}

const userModel = (sequelize: Sequelize) => {
  return User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      create_date: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'create_date',
      },
      update_date: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'update_date',
      },
    },
    {
      sequelize,
      tableName: 'users',
      deletedAt: false,
      createdAt: false,
      updatedAt: false,
      schema: 'shopping',
    }
  );
};

export default userModel;
