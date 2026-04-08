import { Router } from 'express';
import { validate } from '../../middleware/validateRequest.middleware';
import { authenticate } from '../../middleware/auth.middleware';

import {
  createUserAccountHandler,
  getUserAccountHandler,
  updateUserRoleHandler,
  deleteUserAccountHandler,
  getAllUsersInAccountHandler,
  getAllAccountsByUserHandler,
} from './userAccount.controller';

import { idParamSchema } from './userAccount.dto';

import { validateParams } from '../../middleware/validateParams.middleware';

const router = Router();

// Create a user account
router.post(
  '/:accountId',
  authenticate(),
  validateParams(idParamSchema),
  createUserAccountHandler,
);

// Get all user accounts for a given account
router.get(
  '/:accountId/users-in-account',
  authenticate(),
  validateParams(idParamSchema),
  getAllUsersInAccountHandler,
);
router.get(
  '/:userId/accounts/user',
  authenticate(),
  validateParams(idParamSchema),
  getAllAccountsByUserHandler,
);

// Get a single user account by ID
router.get(
  '/:id',
  authenticate(),
  validateParams(idParamSchema),
  getUserAccountHandler,
);

// Update a user account role
router.patch(
  '/:id',
  authenticate(),
  validateParams(idParamSchema),
  updateUserRoleHandler,
);

// Delete a user account
router.delete(
  '/:id',
  authenticate(),
  validateParams(idParamSchema),
  deleteUserAccountHandler,
);

export default router;
