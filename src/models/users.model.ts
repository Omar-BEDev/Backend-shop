import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces';

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletValue: { type: Number, default: 0 },
  birthDate: { type: Date, required: true },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
