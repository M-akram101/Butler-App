// middleware/routeNotFound.ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};
