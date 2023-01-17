import express from 'express';
import {
  deleteProduct,
  getAllProducts,
  postProduct,
  getProductDetails,
} from '../controllers/product';
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', postProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductDetails);

export default router;
