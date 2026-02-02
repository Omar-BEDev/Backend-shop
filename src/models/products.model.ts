import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../interfaces';

export interface IProductModel extends IProduct, Document {}

const productSchema = new Schema<IProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  images: [{ type: String }],
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  sku: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
