import { Router } from 'express';
import { validate } from '../../middleware/validateRequest.middleware';

import { authenticate } from '../../middleware/auth.middleware';
import {
  createAccountHandler,
  deleteAccountHandler,
  getAccountHandler,
  getAllAccountsHandler,
  updateAccountHandler,
} from './account.controller';
import {
  AccountCreateSchema,
  accountIdParamSchema,
  AccountUpdateSchema,
} from './account.dto';
import { validateParams } from '../../middleware/validateParams.middleware';

const router = Router();
router.post(
  '/',
  authenticate(),
  validate(AccountCreateSchema),
  createAccountHandler,
);
router.get('/', authenticate(), getAllAccountsHandler);
router.get(
  '/:id',
  authenticate(),
  validateParams(accountIdParamSchema),
  getAccountHandler,
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
