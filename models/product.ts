import { Model, DataTypes, Optional } from 'sequelize';

import sequelize from '../utils/database';

export interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  description?: string;
  totalQnt: number;
  available: number;
  image?: ImageAttributes;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
interface ImageAttributes {
  id?: number;
  url: string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}

interface ImageInstance
  extends Model<ImageAttributes, ImageCreationAttributes>,
    ImageAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Product = sequelize.define<ProductInstance>(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    totalQnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

const Image = sequelize.define<ImageInstance>(
  'image',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'images',
    timestamps: true,
  }
);

Product.hasOne(Image);
Image.belongsTo(Product);

export { Product, Image };
