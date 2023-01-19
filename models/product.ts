import { Schema, Model, model } from 'mongoose';
import { ImageAttributes } from './image';
import { UserAttributes } from './user';

export type ProductAttributes = {
  _id: Schema.Types.ObjectId;
  title: string;
  price: number;
  description?: string;
  totalQnt: number;
  available: number;
  image: Schema.Types.ObjectId 
  user: Schema.Types.ObjectId 
};

const ProductSchema = new Schema<ProductAttributes>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalQnt: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  description: String,
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export interface ProductDocument extends ProductAttributes, Document {}
export interface ProductModel extends Model<ProductDocument> {}

export const Product = model<ProductAttributes>('Product', ProductSchema);
