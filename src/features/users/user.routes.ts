import { Router } from 'express';
import { validate } from '../../middleware/validateRequest.middleware';

import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
} from './user.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { UpdateUserSchema } from './user.dto';

const router = Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserHandler);
router.patch(
  '/me',
  authenticate(),
  validate(UpdateUserSchema),
  updateUserHandler,
);
router.delete('/me', authenticate(), deleteUserHandler);

export default router;
