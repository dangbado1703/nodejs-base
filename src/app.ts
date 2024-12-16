import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
import Express, { Application } from 'express';
import LoginRouter from './router/login.router';
import ProductRouter from './router/product.router';
import ProductType from './router/productType.router';
import { requestMiddleware } from './middleware/request.middleware';
import { Database } from './config/db.config';

const dbInstance = Database.getInstance();
dbInstance.db;
declare module 'express-serve-static-core' {
  interface Request {
    email?: string;
    fileValidationError?: string;
    user_id: number;
  }
}
const app: Application = Express();
const PORT = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(Express.static(__dirname + '/assets'));
app.use('/user', LoginRouter);

app.use((req, res, next) => {
  requestMiddleware(req, res, next);
});

app.use('/product', ProductRouter);

app.use('/product-type', ProductType);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
