import { Request, Response, NextFunction } from 'express';
import {
  createProduct,
  getProducts,
  getSingleProduct,
  removeProduct,
  saveProduct,
} from '../models/product';
import { sendJsonRes } from '../utils/response';

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = getProducts();
    sendJsonRes(res, products, 'Get Products Success', 200);
  } catch (error) {
    sendJsonRes(res, null, 'Error while retriving products', 500, false, error);
  }
};

const getProductDetails = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (id) {
      const product = getSingleProduct(id);
      if (product) {
        sendJsonRes(res, product, 'Get Product Success', 200);
      } else {
        sendJsonRes(res, null, 'Error while fetching product', 400, false, {
          message: 'Id does not exist',
        });
      }
    } else {
      sendJsonRes(res, null, 'Error while deleting product', 400, false, {
        message: 'Please provide id',
      });
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while retriving product', 500, false, error);
  }
};

const postProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body) {
      const { title, description, price, image, totalQnt } = req.body;
      if (title && price && totalQnt) {
        if (typeof price === 'number' && typeof totalQnt === 'number') {
          const product = createProduct(
            title,
            price,
            description,
            image,
            totalQnt
          );
          saveProduct(product);
          sendJsonRes(res, product, 'Product created successfully', 201);
        } else {
          sendJsonRes(res, null, 'Error while storing product', 400, false, {
            message: 'Please provide valide type ',
          });
        }
      } else {
        sendJsonRes(res, null, 'Error while storing product', 400, false, {
          message: 'Please provide title and price and Qnt',
        });
      }
    } else {
      sendJsonRes(res, null, 'Error while storing product', 400, false, {
        message: 'Please provide req body',
      });
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while storing product', 500, false, error);
  }
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (id) {
      const isRemoved = removeProduct(id);
      if (isRemoved)
        sendJsonRes(res, null, 'Product deleted successfully', 201);
      else
        sendJsonRes(res, null, 'Error while deleting product', 400, false, {
          message: 'Id does not exist',
        });
    } else {
      sendJsonRes(res, null, 'Error while deleting product', 400, false, {
        message: 'Please provide id',
      });
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while deleting product', 400, false, error);
  }
};

export { getAllProducts, postProduct, deleteProduct, getProductDetails };
