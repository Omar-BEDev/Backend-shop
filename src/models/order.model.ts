import mongoose, { Document, Schema } from 'mongoose';
import { IOrder } from '../interfaces';

export interface IOrderModel extends IOrder, Document {}

const orderSchema = new Schema<IOrderModel>({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  discountValue: { type: Number, default: 0 },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
