import express from 'express';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middleware/errorHandling.middleware';
import { requestLogger } from './middleware/requestLogger.middleware';
import { routeNotFound } from './middleware/routeNotFound.middleware';
import { requestId } from './middleware/requestId.middleware';
// Features Routers
import authRouter from './features/auth/auth.routes';
import userRouter from './features/users/user.routes';
import accountRouter from './features/accounts/account.routes';
import receiptRouter from './features/receipts/receipt.routes';
import receiptScanRouter from './features/receiptScan/receiptScan.routes';
const app = express();

//// Security Middlewares
// Security Headers
app.use(helmet());
// Rate Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this Ip, Please try again in an hour !!',
});
app.use(express.json({ limit: '10kb' }));

// Parses cookie to req
app.use(cookieParser());

// Development logger
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Generating request Id for logs
app.use(requestId);
// Request logger
app.use(requestLogger);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/receipts', receiptRouter);
app.use('/api/v1/receiptScan', receiptScanRouter);
// Global error handler (should be after routes)
app.use(routeNotFound);
app.use(errorHandler);

export default app;
