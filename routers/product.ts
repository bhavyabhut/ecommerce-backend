import express from 'express'
import {
  deleteProduct,
  getAllProducts,
  postProduct,
  getProductDetails,
} from '../controllers/product'
import { verifyToken } from '../middleware/auth'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', verifyToken, postProduct)
router.delete('/:id', verifyToken, deleteProduct)
router.get('/:id', getProductDetails)

export default router
