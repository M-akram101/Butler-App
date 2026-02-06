import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { catchAsync } from '../utils/catchAsync';
import { getUserRoleById } from '../features/auth/auth.service';
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
      iat: number;
    };
    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      throw new AppError('Invalid token payload', 401);
    }
    // Check if user exists
    const user = await getUserRoleById(decoded.id);

    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    // Checking if passward wasnt changed after token issuance
    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      throw new AppError('Password changed. Please login again.', 401);
    }
    res.locals.user = { id: decoded.id, role: user.role };

    // add condition to check user didnt change pass after token issuance

    next();
  });
