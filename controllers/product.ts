import { Request, Response } from 'express'
import { Image } from '../models/image'
import { Product } from '../models/product'
import { sendJsonRes } from '../utils/response'

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('image')
    sendJsonRes(res, products, 'Get Products Success', 200)
  } catch (error) {
    sendJsonRes(res, null, 'Error while retriving products', 500, false, error)
  }
}

const getProductDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id) {
      const product = await Product.findById(id).populate('image')
      if (product) {
        sendJsonRes(res, product, 'Get Product Success', 200)
      } else {
        sendJsonRes(res, null, 'Error while fetching product', 400, false, {
          message: 'Id does not exist',
        })
      }
    } else {
      sendJsonRes(res, null, 'Error while deleting product', 400, false, {
        message: 'Please provide id',
      })
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while retriving product', 500, false, error)
  }
}

const postProduct = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const { title, description, price, image, totalQnt } = req.body
      if (title && price && totalQnt) {
        if (typeof price === 'number' && typeof totalQnt === 'number') {
          const imageData = new Image({ url: image })
          const savedImage = await imageData.save()
          const product = new Product({
            title,
            price,
            description,
            image: savedImage,
            totalQnt,
            available: totalQnt,
            user: req.user,
          })
          const savedProduct = await product.save()
          sendJsonRes(res, savedProduct, 'Product created successfully', 201)
        } else {
          sendJsonRes(res, null, 'Error while storing product', 400, false, {
            message: 'Please provide valide type ',
          })
        }
      } else {
        sendJsonRes(res, null, 'Error while storing product', 400, false, {
          message: 'Please provide title and price and Qnt',
        })
      }
    } else {
      sendJsonRes(res, null, 'Error while storing product', 400, false, {
        message: 'Please provide req body',
      })
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while storing product', 500, false, error)
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id) {
      await Product.findByIdAndDelete(id)

      sendJsonRes(res, null, 'Product deleted successfully', 201)
    } else {
      sendJsonRes(res, null, 'Error while deleting product', 400, false, {
        message: 'Please provide id',
      })
    }
  } catch (error) {
    sendJsonRes(res, null, 'Error while deleting product', 400, false, error)
  }
}

export { getAllProducts, postProduct, deleteProduct, getProductDetails }
