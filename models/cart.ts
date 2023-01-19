import { Product, ProductAttributes } from './product';

export interface CartProduct extends ProductAttributes {
  cartQnt: number;
}

export type Cart = {
  totalPrice: number;
  totalItems: number;
  cartProducts: CartProduct[];
};

const cart: Cart = {
  totalItems: 0,
  totalPrice: 0,
  cartProducts: [],
};

const getCart = () => {
  try {
    return cart;
  } catch (error) {
    throw error;
  }
};

const updateCart = (newCart: Cart) => {
  try {
    cart.cartProducts = newCart.cartProducts;
    cart.totalItems = newCart.totalItems;
    cart.totalPrice = newCart.totalPrice;
  } catch (error) {
    throw error;
  }
};

const getSingleCartProduct = (id: string) => {
  return cart.cartProducts.find(
    (product) => product.id.toString() === id.toString()
  );
};

export { getCart, updateCart, getSingleCartProduct };

import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../utils/database';
// import { Product, ProductAttributes } from './product';

// export interface CartProduct extends ProductAttributes {
//   cartQnt: number;
// }

// export interface CartAttributes {
//   id?: number;
//   totalItems: number;
//   totalPrice: number;
//   cartProducts?: CartProductAttributes[];
// }

// interface CartProductAttributes {
//   id?: number;
//   product?: ProductAttributes;
//   cartQnt: number;
// }

// interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

// interface CartProductCreationAttributes
//   extends Optional<CartAttributes, 'id'> {}

// interface CartProductInstance
//   extends Model<CartProductAttributes, CartProductCreationAttributes>,
//     CartProductAttributes {
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface CartInstance
//   extends Model<CartAttributes, CartCreationAttributes>,
//     CartAttributes {
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const Cart = sequelize.define<CartInstance>('cart', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   totalItems: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   totalPrice: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// const CartProduct = sequelize.define<CartProductInstance>('cartProducts', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   cartQnt: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

// Cart.hasMany(CartProduct);
// CartProduct.belongsTo(Product);
// CartProduct.belongsTo(Cart);

// // const getCart = () => {
// //   try {
// //     return cart;
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// // const updateCart = (newCart: Cart) => {
// //   try {
// //     cart.cartProducts = newCart.cartProducts;
// //     cart.totalItems = newCart.totalItems;
// //     cart.totalPrice = newCart.totalPrice;
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// // const getSingleCartProduct = (id: string) => {
// //   return cart.cartProducts.find((product) => product.id === id);
// // };

// export { Cart, CartProduct };
