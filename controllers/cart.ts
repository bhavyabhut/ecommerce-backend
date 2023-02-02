import { Request, Response } from 'express'

import { Cart } from '../models/cart'
import { Product } from '../models/product'
import { sendJsonRes } from '../utils/response'

const getCartDetails = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find({ user: req.user._id })
    sendJsonRes(res, cart, 'Cart details', 200)
  } catch (error) {
    sendJsonRes(
      res,
      null,
      'Error while fetching cart details',
      500,
      false,
      error
    )
  }
}

const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { productId, qnt } = req.body
    if (productId && qnt && typeof qnt === 'number') {
      const fullProduct = await Product.findById(productId)
      if (fullProduct) {
        if (fullProduct.available > qnt) {
          const [cart] = await Cart.find({ user: req.user._id })
          if (cart) {
            // work with existing cart
            const existingProduct = cart.cartProducts.findIndex(
              cartProduct => cartProduct.product.toString() === productId
            )
            if (existingProduct !== -1) {
              cart.cartProducts = cart.cartProducts.map(cartProduct => {
                if (cartProduct.product.toString() === productId)
                  cartProduct.cartQnt = cartProduct.cartQnt + qnt
                return cartProduct
              })
            } else {
              cart.totalItems = cart.totalItems + 1
              cart.cartProducts = [
                ...cart.cartProducts,
                { cartQnt: qnt, product: productId },
              ]
            }
            cart.totalPrice = cart.totalPrice + fullProduct.price * qnt
            fullProduct.available = fullProduct.available - qnt
            await cart.save()
          } else {
            // create new cart
            const cart = new Cart({
              totalItems: 1,
              totalPrice: fullProduct.price * qnt,
              user: req.user._id,
              cartProducts: [{ cartQnt: qnt, product: fullProduct._id }],
            })
            fullProduct.available = fullProduct.available - qnt
            await cart.save()
          }
          await fullProduct.save()
          sendJsonRes(res, null, 'Product added successfully', 200)
        } else {
          sendJsonRes(
            res,
            null,
            'Error while adding product to cart',
            400,
            false,
            {
              message: 'Product you are trying to add is out of stock',
            }
          )
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
        )
      }
    } else {
      sendJsonRes(res, null, 'Error while adding product to cart', 400, false, {
        message: 'Please provide valid information',
      })
    }
  } catch (error) {
    sendJsonRes(
      res,
      null,
      'Error while adding product to cart ',
      500,
      false,
      error
    )
  }
}

const deleteProductFromCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const fullProduct = await Product.findById(id)
    if (fullProduct) {
      const [cart] = await Cart.find({ user: req.user._id })
      const existingProduct = cart.cartProducts.find(
        cartProduct => cartProduct.product.toString() === id
      )
      cart.cartProducts = cart.cartProducts.filter(
        cartProduct => cartProduct.product.toString() !== id
      )
      cart.totalItems = cart.totalItems - 1
      if (existingProduct) {
        cart.totalPrice =
          cart.totalPrice - fullProduct.price * existingProduct.cartQnt
        fullProduct.available = fullProduct.available + existingProduct.cartQnt
      }
      await cart.save()
      await fullProduct.save()
      sendJsonRes(res, null, 'Product remove success fully', 200)
    } else {
      // TODO
      // we should remove those products from cart
      sendJsonRes(
        res,
        null,
        'Error while removing product to cart',
        400,
        false,
        {
          message: 'Product does not exist in cart',
        }
      )
    }
  } catch (error) {
    sendJsonRes(
      res,
      null,
      'Error while removing product to cart',
      500,
      false,
      error
    )
  }
}

export { getCartDetails, addProductToCart, deleteProductFromCart }
