import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { error } from 'node:console';
import { catchAsync } from '../utils/catchAsync';
import { getUserById } from '../features/users/user.service';
export const authenticate = () =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    if (!JWT_SECRET) {
      throw new AppError('JWT secret not configured', 500);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
    };

    if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
      throw new AppError('Invalid token payload', 401);
    }
    // Check if user exists
    const user = await getUserById(decoded.id);

    if (!user) {
      throw new AppError('User no longer exists', 401);
    }
    res.locals.userId = decoded.id;
    res.locals.user = user;

    // add condition to check user didnt change pass after token issuance

    next();
  });
