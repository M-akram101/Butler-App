import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss';

import { errorHandler } from './middleware/errorHandling';
import { requestLogger } from './middleware/requestLogger';
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
app.use(xss());

// Development logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Request logger
app.use(requestLogger);
// Routes
// app.use('/api/v1/users', userRouter);

// Global error handler (should be after routes)

app.use(errorHandler);

export default app;
