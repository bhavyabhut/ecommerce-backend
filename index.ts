import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ProductRouter from './routers/product';
import CartRouter from './routers/cart';
import db from './utils/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', ProductRouter);
app.use('/cart', CartRouter);

const PORT = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e, 'Error in sync');
  });
