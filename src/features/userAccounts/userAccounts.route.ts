import { Router } from 'express';
import { validate } from '../../middleware/validateRequest.middleware';
import { authenticate } from '../../middleware/auth.middleware';

import {
  createUserAccountHandler,
  getAllUserAccountsHandler,
  getUserAccountHandler,
  updateUserRoleHandler,
  deleteUserAccountHandler,
} from './userAccount.controller';

import { userAccountIdParamSchema } from './userAccount.dto';

import { validateParams } from '../../middleware/validateParams.middleware';

const router = Router();

// Create a user account
router.post(
  '/:id',
  authenticate(),
  validateParams(userAccountIdParamSchema),
  createUserAccountHandler,
);

// Get all user accounts for a given account
router.get(
  '/:id/all',
  authenticate(),
  validateParams(userAccountIdParamSchema),
  getAllUserAccountsHandler,
);

// Get a single user account by ID
router.get(
  '/:id',
  authenticate(),
  validateParams(userAccountIdParamSchema),
  getUserAccountHandler,
);

// Update a user account role
router.patch(
  '/:id',
  authenticate(),
  validateParams(userAccountIdParamSchema),
  updateUserRoleHandler,
);

// Delete a user account
router.delete(
  '/:id',
  authenticate(),
  validateParams(userAccountIdParamSchema),
  deleteUserAccountHandler,
);

export default router;
