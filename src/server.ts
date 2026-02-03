import app from './app';
import { PORT } from './config/config';
import { coreLogger } from './logger/core';

/**
 * Catch sync errors FIRST
 */
process.on('uncaughtException', (err) => {
  coreLogger.error('Uncaught Exception', {
    message: err.message,
    stack: err.stack,
  });

  process.exit(1);
});

/**
 * Start server
 */
const server = app.listen(PORT, () => {
  coreLogger.info('Server started', {
    port: PORT,
    env: process.env.NODE_ENV,
  });
});

/**
 * Handle async errors
 */
process.on('unhandledRejection', (err: any) => {
  coreLogger.error('Unhandled Rejection', {
    message: err?.message,
    stack: err?.stack,
  });

  server.close(() => process.exit(1));
});

/**
 * Graceful shutdown (Docker, K8s, PM2)
 */
process.on('SIGTERM', () => {
  coreLogger.warn('SIGTERM received. Shutting down gracefully');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  coreLogger.warn('SIGINT received. Shutting down gracefully');
  server.close(() => process.exit(0));
});
