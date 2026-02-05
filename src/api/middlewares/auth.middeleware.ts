import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, IUserPayload } from '../../interfaces';
import { Types } from 'mongoose';
import { ApiError } from '../utils/ApiError';

export const authToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new ApiError("we didn't found token",401);

    const decode = jwt.verify(
        token, 
        process.env.JWT_SECRET as string
    );
    if (!decode) throw new ApiError("Unauthorized user",403)
    req.user = decode as IUserPayload;
    next();
    
};
