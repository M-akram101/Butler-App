import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
export const validateParams =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);

    if (!parsed.success) {
      return next(new AppError('Invalid params', 400));
    }

    req.params = parsed.data as any;
    next();
  };
