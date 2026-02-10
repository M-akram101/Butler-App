import winston from 'winston';
const { timestamp, errors, combine, json, simple } = winston.format;
const { Console, File } = winston.transports;

export const coreLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new Console(),
    new File({ filename: 'logs/error.log', level: 'error' }),
    new File({ filename: 'logs/app.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  coreLogger.add(
    new winston.transports.Console({
      format: simple(),
    }),
  );
}
