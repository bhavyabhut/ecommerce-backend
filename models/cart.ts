import { Product } from './product';

export interface CartProduct extends Product {
  cartQnt: number;
}

export type Cart = {
  totalPrice: number;
  totalItems: number;
  cartProducts: CartProduct[];
};

const cart: Cart = {
  totalItems: 0,
  totalPrice: 0,
  cartProducts: [],
};

const getCart = () => {
  try {
    return cart;
  } catch (error) {
    throw error;
  }
};

const updateCart = (newCart: Cart) => {
  try {
    cart.cartProducts = newCart.cartProducts;
    cart.totalItems = newCart.totalItems;
    cart.totalPrice = newCart.totalPrice;
  } catch (error) {
    throw error;
  }
};

export { getCart, updateCart };
