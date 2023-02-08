import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
import db from "./config/db.config";
import Express, { Application } from "express";
import LoginRouter from "./router/login.router";
db;
declare module "express-serve-static-core" {
  interface Request {
    username?: string;
    fileValidationError?: string;
    user_id: number;
  }
}
const app: Application = Express();
const PORT = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(Express.static(__dirname + "/assets"));
app.use("/shopping", LoginRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
