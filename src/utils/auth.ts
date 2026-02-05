import bcrypt from 'bcrypt';
import { AppError } from './appError';
import { JWT_EXPIRY_TIME, JWT_SECRET } from '../config/config';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isPasswordValid = bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid)
    throw new AppError('Invalid email or password. Please try again', 401);

  return isPasswordValid;
};

export const createAccessToken = (userId: string) => {
  if (!JWT_SECRET || !JWT_EXPIRY_TIME) {
    throw new AppError('Missing Token', 400);
  }

  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY_TIME });
};
