import { Request, Response, NextFunction } from 'express';
import {
  makeOrderData,
  createOrder,
  cancelOrder,
  pendingOrder,
  getOrders,
} from '../services/orders.service';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

export const addOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderData = makeOrderData(req.body);
  const message = await createOrder(orderData);
  res.status(201).json(message);
});

export const getAllOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await getOrders();
  res.status(200).json(orders);
});

export const cancel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const  {id}  = req.params;
  if (typeof id !== "string") throw new ApiError("invalid order id",404)
  const message = await cancelOrder(id);
  res.status(200).json(message);
});

export const updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, productId } = req.params;
  if (typeof productId !== "string" ) throw new ApiError("invalid product id",404)
  if (typeof id !== "string") throw new ApiError("invalid order id",404)
  const { quantity } = req.body;
  if (!quantity) {
    throw new ApiError('Quantity is required', 400);
  }

  const order = await pendingOrder(id, productId, quantity);
  res.status(200).json(order);
});
