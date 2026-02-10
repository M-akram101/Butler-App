import { coreLogger } from './core';
import type { Request } from 'express';
import { sanitize } from './sanitize';
import { AppError } from '../utils/appError';
export const errorLogger = (
  err: unknown,
  req?: Request,
  extra?: Record<string, any>,
) => {
  const isAppError = err instanceof AppError;

  const level = isAppError ? 'warn' : 'error';
  const label = isAppError ? 'Operational error,' : 'Unhandled error,';

  coreLogger[level](label, {
    requestId: req?.requestId,
    message: err instanceof Error ? err.message : String(err),
    statusCode: isAppError ? err.statusCode : 500,
    path: req?.url,
    method: req?.method,
    userId: (req as any)?.user?.id,
    ...(!isAppError && err instanceof Error ? { stack: err.stack } : {}),
    ...(extra ? sanitize(extra) : {}),
  });
};
