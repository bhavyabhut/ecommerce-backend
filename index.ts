import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ProductRouter from './routers/product';
import CartRouter from './routers/cart';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', ProductRouter);
app.use('/cart', CartRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
