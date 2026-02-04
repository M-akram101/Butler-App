import { coreLogger } from './core';
import type { Request } from 'express';
import { sanitize } from './sanitize';
export const errorLogger = (
  err: unknown,
  req?: Request,
  extra?: Record<string, any>,
) => {
  coreLogger.error('Unhandled error', {
    requestId: req?.requestId,
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
    path: req?.url,
    method: req?.method,
    userId: (req as any)?.user?.id,
    ...(extra ? sanitize(extra) : {}),
  });
};
