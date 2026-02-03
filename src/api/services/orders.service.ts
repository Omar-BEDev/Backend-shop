import { Types } from 'mongoose';
import { IOrder } from '../../interfaces';
import { Order } from '../models/order.model';
import Product from '../models/products.model';
import { ApiError } from '../utils/ApiError';
import { ObjectId } from 'mongodb';

export const makeOrderData = async(body: {
  userId : string,
  items : [{
    productId : string,
    name : string,
    price : number, 
    quantity : number
  }],
  discountValue : number
}): Promise<IOrder> => {
  
  const { userId, items, discountValue } = body;
  let products = [];
  
  let i = 0;
  while (i < items.length) {
  items[i].price = 0
  if (!Types.ObjectId.isValid(items[i].productId)) throw new ApiError("invalid item info",404)
   let product = await Product.findOne({_id : items[i].productId});
   if (!product) throw new ApiError("we didn't found product",404)
   products.push(product)
  i++
}
  while (i < products.length) {
    items[i].price = products[i].price
    i++
  }
  const totalPrice = items.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );
  if (!Types.ObjectId.isValid(userId)) throw new ApiError("invalid user id",400)
  const transformationUserId = new ObjectId(userId)
  const orderData: IOrder = {
    userId : transformationUserId,
    items,
    totalPrice,
    discountValue: discountValue || 0,
    status: 'pending',
    createdAt: new Date(),
  };

  return orderData;
};

export const createOrder = async (orderData: IOrder) => {
  const newOrder = new Order(orderData);
  await newOrder.save();
  return { message: 'Order successfully added' };
};

export const cancelOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError('Order not found', 404);
  }
  order.status = 'cancelled';
  await order.save();
  return { message: 'Order successfully cancelled' };
};

export const pendingOrder = async (orderId: string, productId: string, quantity: number) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError('Order not found', 404);
  }

  if (order.status !== 'pending') {
    throw new ApiError('Order is not in pending state', 400);
  }

  const item = order.items.find((item) => item.productId === productId);

  if (!item) {
    throw new ApiError('Product not found in order', 404);
  }

  item.quantity = quantity;

  order.totalPrice = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await order.save();
  return order;
};

export const getOrders = async () => {
  const orders = await Order.find();
  return orders;
};
