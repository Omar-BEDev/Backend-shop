import { Types } from "mongoose";

export interface IOrder {
  userId: Types.ObjectId;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  discountValue: number;
  status: string;
  createdAt: Date;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  sold: number;
  images: string[];
  category: string;
  isActive: boolean;
  createdAt: Date;
  sku: string;
}

export interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  walletValue: number;
  birthDate: Date;
  address: {
    country: string;
    city: string;
  };
  role: string;
  createdAt: Date;
  isBanned: boolean;
  status: string;
}