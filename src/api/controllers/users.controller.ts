import { Request, Response } from 'express';
import {
  makeUserData,
  createUser,
  createJwtToken,
} from '../services/users.service';
import { catchAsync } from '../../utils/catchAsync';

export const login = async (req: Request, res: Response) => {
  // TODO: Implement login logic
};

export const signup = catchAsync(async (req: Request, res: Response) => {
  const userData = makeUserData(req.body);
  const newUser = await createUser(userData);
  const token = createJwtToken(newUser._id);
  res.status(201).json({ user: newUser, token });
});

export const bannedUser = async (req: Request, res: Response) => {
  // TODO: Implement user banning logic
};

export const changeRole = async (req: Request, res: Response) => {
  // TODO: Implement role changing logic
};
