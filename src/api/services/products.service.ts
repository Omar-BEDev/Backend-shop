import { IProduct } from '../../interfaces';
import Product from '../../models/products.model';

export const generateSku = (name: string, category: string): string => {
  const categoryAbbr = category.substring(0, 3).toUpperCase();
  const nameAbbr = name.substring(0, 3).toUpperCase();
  const randomNumber = Math.floor(100 + Math.random() * 900);
  return `${categoryAbbr}-${nameAbbr}-${randomNumber}`;
};

export const makeProductData = (body: {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}): IProduct => {
  const { name, description, price, stock, images, category } = body;

  const productData: IProduct = {
    name,
    description,
    price,
    stock,
    sold: 0,
    images,
    category,
    isActive: true,
    createdAt: new Date(),
    sku: generateSku(name, category),
  };

  return productData;
};

export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const newProduct = new Product(productData);
  await newProduct.save();
  return newProduct;
};

export const deleteProduct = async (productId: string): Promise<{ message: string }> => {
  await Product.findByIdAndDelete(productId);
  return { message: 'Product successfully deleted' };
};