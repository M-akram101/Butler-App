import type { Response } from 'express';
import { ApiResponseStatus } from './enums/enums';

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200) => {
  res.status(statusCode).json({ status: ApiResponseStatus.Success, data });
};
