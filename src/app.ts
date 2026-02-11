import express from 'express';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middleware/errorHandling';
import { requestLogger } from './middleware/requestLogger';
import { routeNotFound } from './middleware/routeNotFound';
import { requestId } from './middleware/requestId';
// Features Routers
import authRouter from './features/auth/auth.routes';
import userRouter from './features/users/user.routes';
import accountRouter from './features/accounts/account.routes';
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

// Global error handler (should be after routes)
app.use(routeNotFound);
app.use(errorHandler);

export default app;
