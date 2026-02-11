import { coreLogger } from './core';
import type { Request } from 'express';
import { sanitize } from './sanitize';
import { AppError } from '../utils/appError';
export const errorLogger = (
  err: unknown,
  req?: Request,
  extra?: { level?: 'error' | 'warn' } & Record<string, any>,
) => {
  const level = extra?.level ?? 'error';

  coreLogger[level]('Unhandled error', {
    requestId: req?.requestId,
    message: err instanceof Error ? err.message : String(err),
    path: req?.url,
    method: req?.method,
    userId: (req as any)?.user?.id,
    ...(err instanceof Error ? { stack: err.stack } : {}),
    ...(extra ?? {}),
  });
};
