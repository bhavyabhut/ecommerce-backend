import { Request, Response, NextFunction } from 'express';
import { Cart, CartProduct, getCart, updateCart } from '../models/cart';
import { getProducts, getSingleProduct, Product } from '../models/product';

import { sendJsonRes } from '../utils/response';
import { getProductDetails } from './product';

const getCartDetails = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = getCart();
    sendJsonRes(res, cart, 'Cart details', 200);
  } catch (error) {
    sendJsonRes(
      res,
      null,
      'Error while fetching cart details',
      500,
      false,
      error
    );
  }
};

const createCartProdcut = (id: string, qnt: number): CartProduct => {
  // we are sure that every time product is avaialbe in the system
  const product = getSingleProduct(id) as Product;
  return { ...product, cartQnt: qnt };
};

const getCartPrice = (products: CartProduct[]) => {
  let answer = 0;
  products.forEach((product) => {
    answer = answer + product.cartQnt * product.price;
  });
  return answer;
};

const getTotalItems = (products: CartProduct[]) => {
  return products.length;
};

const buildCart = (
  id: string,
  qnt: number,
  isExisting: boolean,
  products: CartProduct[],
  existingIndex?: number
): Cart => {
  console.log(isExisting, products, existingIndex);

  if (isExisting && (existingIndex === 0 || existingIndex)) {
    const existingProduct = products[existingIndex];
    products[existingIndex] = {
      ...existingProduct,
      cartQnt: existingProduct.cartQnt + qnt,
    };
    console.log(products, 'after', qnt);

    const totalPrice = getCartPrice(products);
    const totalItems = getTotalItems(products);
    return { cartProducts: products, totalItems, totalPrice };
  } else {
    const cartProducts = createCartProdcut(id, qnt);
    products.push(cartProducts);
    const totalPrice = getCartPrice(products);
    const totalItems = getTotalItems(products);
    return { cartProducts: products, totalItems, totalPrice };
  }
};
const addProductToCart = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, qnt } = req.body;
    if (productId && qnt && typeof qnt === 'number') {
      const product = getSingleProduct(productId);
      if (product) {
        const cart = getCart();
        const existingProduct = cart.cartProducts.findIndex(
          (product) => product.id === productId
        );
        let newCart;
        if (existingProduct !== -1) {
          newCart = buildCart(
            productId,
            qnt,
            true,
            cart.cartProducts,
            existingProduct
          );
        } else {
          newCart = buildCart(productId, qnt, false, cart.cartProducts);
        }
        if (newCart) {
          console.log(newCart, 'newCart');

          updateCart(newCart);
          sendJsonRes(res, null, 'Product added successfully', 200);
        }
      } else {
        sendJsonRes(
          res,
          null,
          'Error while adding product to cart',
          400,
          false,
          {
            message: 'Product you are trying to add is not available',
          }
        );
      }
    } else {
      sendJsonRes(res, null, 'Error while adding product to cart', 400, false, {
        message: 'Please provide valid information',
      });
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while adding product to cart ', 400, false, {
      message: 'Internal Server Error',
    });
  }
};

const deleteProductFromCart = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { getCartDetails, deleteProductFromCart, addProductToCart };
