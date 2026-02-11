import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';

import { authenticate } from '../../middleware/authMiddleware';
import {
  createAccountHandler,
  deleteAccountHandler,
  updateAccountHandler,
} from './account.controller';
import {
  AccountCreateSchema,
  accountIdParamSchema,
  AccountUpdateSchema,
} from './account.dto';
import { validateParams } from '../../middleware/validateParams';

const router = Router();
router.post(
  '/',
  authenticate(),
  validate(AccountCreateSchema),
  createAccountHandler,
);
router.get('/', authenticate(), getAllAccountsByUserIdHandler);
router.get(
  '/:id',
  authenticate(),
  validateParams(accountIdParamSchema),
  getAccountByIdHandler,
);
router.patch(
  '/:id',
  authenticate(),
  validateParams(accountIdParamSchema),
  validate(AccountUpdateSchema),
  updateAccountHandler,
);
router.delete(
  '/:id',
  authenticate(),
  validateParams(accountIdParamSchema),
  deleteAccountHandler,
);

export default router;
