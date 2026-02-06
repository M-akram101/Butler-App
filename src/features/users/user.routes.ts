import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';
import { loginHandler, signUpHandler } from '../auth/auth.controller';
import { LoginSchema, SignUpSchema, UpdateUserSchema } from './user.dto';
import {
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} from './user.controller';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getAllUsersHandler);
router.patch(
  '/me',
  authenticate,
  validate(UpdateUserSchema),
  updateUserHandler,
);
router.delete('/me', authenticate, deleteUserHandler);

export default router;
