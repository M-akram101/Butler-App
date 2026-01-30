
import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from "zod";


export const validate = (schema: ZodSchema) => async(req:Request,res: Response, next: NextFunction) => {

            try {
                await schema.parseAsync(req.body);
                next();
            }
            catch (error) {
                // checks if its a specific zod error
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path,
            message: err.message
          }))
        });
      }
      next(error)
} };