import { IProduct } from '../../interfaces';
import Product from '../models/products.model';
import * as crypto from 'crypto';
import { ApiError } from '../utils/ApiError';
import { Types } from 'mongoose';

export const generateSku = (name: string, category: string): string => {
  const categoryAbbr = category.substring(0, 3).toUpperCase();
  const nameAbbr = name.substring(0, 3).toUpperCase();
  const randomString = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${categoryAbbr}-${nameAbbr}-${randomString}`;
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

export const getAllProduct = async() : Promise<IProduct[]>=>{
  const products = await Product.find()
  if(!products) throw new ApiError("we didn't found any products",404)
  return products
}

export const updateProduct = async (body : {
  name : string,
  price : number,
  description : string,
  isActive : boolean,
  images : string,
  stock : number
}, productId : string
) => {
  if (!Types.ObjectId.isValid(productId)) throw new ApiError("invalid product Id",400)
  const product = await Product.findByIdAndUpdate(
  {_id : productId},
  {$set : body},
  {new : true}
  )
  return product
}