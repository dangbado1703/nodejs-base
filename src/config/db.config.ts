import { Sequelize } from "sequelize";
import userModel, { User } from "../model/user.model";
import { IFormDB } from "../type/db.type";

const USER_NAME = process.env.USER_NAME as string;
const PASSWORD = process.env.PASSWORD as string;
console.log('username:::', USER_NAME)
console.log('password:::', PASSWORD)
const sequelize = new Sequelize('shopping', USER_NAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});


const db: IFormDB = {}
db.sequelize = sequelize
db.User = userModel(sequelize)
export default db
