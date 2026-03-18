import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';
import { catchAsync } from '../utils/catchAsync';

export const validate = (schema: ZodSchema) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.issues.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      throw error; // let catchAsync forward to global handler
    }
  });
