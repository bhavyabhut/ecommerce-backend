import express from 'express'
import {
  getCartDetails,
  addProductToCart,
  deleteProductFromCart,
} from '../controllers/cart'
const router = express.Router()

router.get('/', getCartDetails)
router.post('/', addProductToCart)
router.delete('/:id', deleteProductFromCart)

export default router
