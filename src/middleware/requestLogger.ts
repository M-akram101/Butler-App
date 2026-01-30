import type { Request, Response, NextFunction } from 'express';
import { coreLogger } from '../logger/core';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

    const level =
      res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';

    coreLogger.log(level, 'HTTP request completed', {
      event: 'HTTP_REQUEST',
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Math.round(durationMs),
      ip: req.ip,
      userId: (req as any).user?.id, // if auth middleware exists
    });
  });

  next();
}
