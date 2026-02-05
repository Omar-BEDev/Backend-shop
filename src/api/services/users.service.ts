import User from '../models/users.model';
import { IUser } from '../../interfaces';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


export const makeUserData = async (userData: IUser): Promise<IUser> => {
    userData.password = await bcrypt.hash(userData.password, 10);
  
  return userData;
};

export const createUser = async (userData: IUser) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export const createJwtToken = (userId: mongoose.Types.ObjectId) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(
    { id: userId, role : "user" }, 
    secret as string, 
    {expiresIn: '1h', }
  );
  return token;
};
