import { Request, Response, NextFunction } from 'express';
import { Image, Product } from '../models/product';

import { sendJsonRes } from '../utils/response';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Product.findAll({
      include: [{ model: Image }],
    });
    const productsArray = response.map((product) => product.toJSON());

    sendJsonRes(res, productsArray, 'Get Products Success', 200);
  } catch (error) {
    sendJsonRes(res, null, 'Error while retriving products', 500, false, error);
  }
};

const getProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (id) {
      const response = await Product.findByPk(id, {
        include: [{ model: Image }],
      });
      if (response) {
        sendJsonRes(res, response.toJSON(), 'Get Product Success', 200);
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

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body) {
      const { title, description, price, image, totalQnt } = req.body;
      if (title && price && totalQnt) {
        if (typeof price === 'number' && typeof totalQnt === 'number') {
          const productWithImage = await Product.create(
            {
              title,
              price,
              image: {
                url: image,
              },
              description,
              totalQnt,
              available: totalQnt,
            },
            {
              include: [Image],
            }
          );

          sendJsonRes(
            res,
            productWithImage.toJSON(),
            'Product created successfully',
            201
          );
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

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (id) {
      const deletedProduct = await Product.destroy({
        where: {
          id: id,
        },
      });
      if (deletedProduct)
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
