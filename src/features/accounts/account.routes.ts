import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';

import { authenticate } from '../../middleware/authMiddleware';
import {
  createAccountHandler,
  deleteAccountHandler,
  getAccountByIdHandler,
  getAllAccountsByUserIdHandler,
  updateAccountHandler,
} from './account.controller';
import { AccountCreateSchema, AccountUpdateSchema } from './account.dto';

const router = Router();
router.post(
  '/',
  authenticate(),
  validate(AccountCreateSchema),
  createAccountHandler,
);
router.get('/', authenticate(), getAllAccountsByUserIdHandler);
router.get('/:id', authenticate(), getAccountByIdHandler);
router.patch(
  '/me',
  authenticate(),
  validate(AccountUpdateSchema),
  updateAccountHandler,
);
router.delete('/me', authenticate(), deleteAccountHandler);

export default router;
