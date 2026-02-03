import { IOrder } from '../../interfaces';
import { Order } from '../models/order.model';
import { ApiError } from '../utils/ApiError';

export const makeOrderData = (body: any): IOrder => {
  const { userId, items, discountValue } = body;

  const totalPrice = items.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  const orderData: IOrder = {
    userId,
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
