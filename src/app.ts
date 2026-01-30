import express from 'express';
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss');
import { errorHandler } from './middlewares/errorhandling';

const app = express();

// For development only
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
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
// Global error handler (should be after routes)




// Routes
// app.use('/api/v1/users', userRouter);
app.use(errorHandler);

export default app;
