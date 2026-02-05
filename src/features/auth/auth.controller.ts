import { sendSuccess } from '../../utils/apiResponse';
import { hashPassword, verifyPassword } from '../../utils/auth';
import { catchAsync } from '../../utils/catchAsync';
import type { SignUpDTO } from '../users/user.dto';
import { getUserByEmail } from '../users/user.service';
import { login, signUp } from './auth.service';

export const signUpHandler = catchAsync(async (req, res, next) => {
  const data: SignUpDTO = req.body;

  const user = await signUp(data); // service handles hashing + DB

  sendSuccess(res, user, 201);
});

export const loginHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  res.cookie('token', result.token, {
    // Prevents XSS
    httpOnly: true,
    // only sent over https
    secure: process.env.NODE_ENV === 'production',
    // Prevents accessing from different site
    sameSite: 'strict',
  });
  sendSuccess(res, { user: result.user });
});
