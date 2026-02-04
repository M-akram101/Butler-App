import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEVELOPMENT = NODE_ENV === 'development';

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY_TIME = process.env.JWT_EXPIRY_TIME as any;
