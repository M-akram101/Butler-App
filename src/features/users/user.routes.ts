import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';

import {
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} from './user.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { UpdateUserSchema } from './user.dto';

const router = Router();
console.log('Inside router');
router.get('/', getAllUsersHandler);
router.patch(
  '/me',
  authenticate(),
  validate(UpdateUserSchema),
  updateUserHandler,
);
router.delete('/me', authenticate(), deleteUserHandler);

export default router;
