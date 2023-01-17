export type Product = {
  id: string;
  title: string;
  price: number;
  description?: string;
  totalQnt: number;
  available: number;
  image: {
    url: string;
  };
};

let products: Product[] = [
  {
    id: '12',
    title: 'Mobile : Realme 9 pro +',
    price: 24999,
    description: 'This is the best camera phone under 25k',
    image: {
      url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80',
    },
    available: 100,
    totalQnt: 100,
  },
  {
    id: '2',
    title: 'Books',
    price: 599,
    description: 'Collection of books',
    image: {
      url: 'https://images.unsplash.com/photo-1673878034060-2d97a101563a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    },
    totalQnt: 101,
    available: 50,
  },
  {
    id: '3',
    title: 'Furnicture',
    price: 24999,
    description: 'Best good looking furnicture',
    image: {
      url: 'https://images.unsplash.com/photo-1673866950900-029d9811d21b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    totalQnt: 12,
    available: 1,
  },
];

const createProduct = (
  title: string,
  price: number,
  description: string,
  image_url: string,
  totalQnt: number
) => {
  const image = {
    url: image_url,
  };
  const product: Product = {
    id: Math.random().toString(),
    title,
    price,
    description,
    image,
    totalQnt,
    available: totalQnt,
  };
  return product;
};

const saveProduct = (product: Product) => {
  products.push(product);
};

const updateProduct = (product: Product) => {
  products = products.map((pro) => {
    if (pro.id === product.id) {
      return product;
    } else return pro;
  });
};

const getProducts = () => {
  return products;
};
const getSingleProduct = (id: string) =>
  products.find((product) => product.id === id);

const removeProduct = (id: string) => {
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    return true;
  }
  return false;
};

export {
  createProduct,
  saveProduct,
  getProducts,
  removeProduct,
  getSingleProduct,
  updateProduct,
};
