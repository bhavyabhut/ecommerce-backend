import express, { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import ProductRouter from './routers/product';
import CartRouter from './routers/cart';
import AuthRouter from './routers/auth';
import { verifyToken } from './middleware/auth';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
declare module 'express-serve-static-core' {
  interface Request {
    user: { _id: string; email: string };
  }
}
app.use('/products', ProductRouter);
app.use('/cart', verifyToken, CartRouter);
app.use('/auth', AuthRouter);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_STRING || '')
  .then(async () => {
    console.log('Database connect!!');
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((e) => console.log(e, 'Connection error'));
