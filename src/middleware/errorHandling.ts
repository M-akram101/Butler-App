// middleware/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/appError';
import { DEVELOPMENT } from '../config/config';
import { ApiResponseStatus } from '../utils/enums/enums';
import { errorLogger } from '../logger/error.logger';

type PrismaLikeError = {
  code?: string;
  meta?: {
    target?: string[];
  };
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let status = ApiResponseStatus.Failure;
  let logLevel: 'error' | 'warn' = 'error';

  // Prisma errors
  if (err instanceof Error && err.name === 'PrismaClientValidationError') {
    statusCode = 400;
    message = 'Invalid query parameters';
    status = ApiResponseStatus.BadRequest;
    logLevel = 'warn';
  }

  if (err && typeof err === 'object' && 'code' in err) {
    const prismaErr = err as PrismaLikeError;

    if (prismaErr.code === 'P2002') {
      const fields = prismaErr.meta?.target?.join(', ') ?? 'field';
      statusCode = 409;
      message = `Duplicate value for ${fields}`;
      status = ApiResponseStatus.Conflict;
      logLevel = 'warn';
    }

    if (prismaErr.code === 'P2025') {
      statusCode = 404;
      message = 'Resource not found';
      status = ApiResponseStatus.NotFound;
      logLevel = 'warn';
    }
    if (prismaErr.code === 'P2003') {
      statusCode = 400;
      message = 'Failed to delete';
      status = ApiResponseStatus.Failure;
      logLevel = 'warn';
    }
    if (prismaErr.code === 'P2000') {
      statusCode = 400;
      message = 'Value is too long';
      status = ApiResponseStatus.Failure;
      logLevel = 'warn';
    }
    if (prismaErr.code === 'P2011') {
      statusCode = 400;
      message = 'Missing value';
      status = ApiResponseStatus.Failure;
      logLevel = 'warn';
    }

    if (prismaErr.code === 'P6004') {
      statusCode = 503;
      message = 'Request timed out. Please try again.';
      logLevel = 'warn';
      status = ApiResponseStatus.Failure;
    }
    if (prismaErr.code === 'P6009') {
      statusCode = 413;
      message = 'Response too large. Use pagination.';
      logLevel = 'warn';
      status = ApiResponseStatus.Failure;
    }
  }

  // Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map((e) => e.message).join(', ');
    status = ApiResponseStatus.BadRequest;
    logLevel = 'warn';
  }

  // JWT errors
  else if (err instanceof Error && err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    status = ApiResponseStatus.Unauthorized;
    logLevel = 'warn';
  } else if (err instanceof Error && err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    status = ApiResponseStatus.Unauthorized;
    logLevel = 'warn';
  }

  // App errors
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    status = ApiResponseStatus.Failure;
    logLevel = 'warn';
  }

  // Generic JS errors
  else if (err instanceof Error) {
    message = err.message;
  }

  // Dev logging
  if (DEVELOPMENT || statusCode >= 500) {
    console.error(err);
  }

  // Centralized logging (ONCE)
  errorLogger(err, req, {
    statusCode,
    responseStatus: status,
    level: logLevel,
  });

  res.status(statusCode).json({ status, message });
};
