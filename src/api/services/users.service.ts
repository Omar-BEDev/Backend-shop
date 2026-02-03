import User from '../models/users.model';
import { IUser } from '../../interfaces';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export const makeUserData = (userData: any): IUser => {
  // TODO: Implement logic to map and validate userData
  return userData;
};

export const createUser = async (userData: IUser) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export const createJwtToken = (userId: mongoose.Types.ObjectId) => {
  // TODO: Move secret to a secure place (environment variables)
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id: userId, role : "user" }, secret as string, {
    expiresIn: '1h', 
  });
  return token;
};
