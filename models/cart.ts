import { Schema, model } from 'mongoose';

import { ProductAttributes } from './product';

export interface CartProduct extends ProductAttributes {
  cartQnt: number;
}

export type CartAttributes = {
  _id: Schema.Types.ObjectId;
  totalPrice: number;
  totalItems: number;
  cartProducts: { cartQnt: number; product: Schema.Types.ObjectId }[];
  user: Schema.Types.ObjectId;
};

const CartSchema = new Schema<CartAttributes>({
  totalItems: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cartProducts: {
    type: [
      {
        cartQnt: {
          type: Number,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    _id: false,
  },
});

export const Cart = model<CartAttributes>('Cart', CartSchema);
