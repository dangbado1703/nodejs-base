import { User } from "./../model/user.model";
import { Sequelize } from "sequelize";
export interface IFormDB {
  sequelize?: Sequelize;
  User?: typeof User;
}
