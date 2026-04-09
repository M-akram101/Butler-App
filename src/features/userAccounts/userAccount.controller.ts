import { sendSuccess } from '../../utils/apiResponse';

import { catchAsync } from '../../utils/catchAsync';
import type { UpdateUserAccountDTO } from './userAccount.dto';
import {
  createUserAccount,
  deleteUserAccountById,
  getAllAccountsByUserByUserId,
  getAllUsersInAccountByAccountId,
  getUserAccountById,
  updateUserRoleById,
} from './userAccount.service';

export const createUserAccountHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const accountId = req.params.id as string;
  const userAccount = await createUserAccount(userId, accountId);
  sendSuccess(res, userAccount);
});

export const getAllUsersInAccountHandler = catchAsync(
  async (req, res, next) => {
    const accountId = req.params.accountId as any;
    const userAccounts = await getAllUsersInAccountByAccountId(accountId);
    sendSuccess(res, userAccounts);
  },
);
export const getAllAccountsByUserHandler = catchAsync(
  async (req, res, next) => {
    const userId = res.locals.user.id;
    const userAccounts = await getAllAccountsByUserByUserId(userId);
    sendSuccess(res, userAccounts);
  },
);

export const getUserAccountHandler = catchAsync(async (req, res, next) => {
  const userAccountId = req.params.id as string;

  const userAccount = await getUserAccountById(userAccountId);
  sendSuccess(res, userAccount);
});

export const updateUserRoleHandler = catchAsync(async (req, res, next) => {
  const userAccountId = req.params.userAccountId as string;
  const accountId = req.params.accountId as string;
  const userId = res.locals.user.id;

  const data: UpdateUserAccountDTO = req.body;

  const userAccount = await updateUserRoleById(
    userAccountId,
    userId,
    accountId,
    data,
  );
  sendSuccess(res, userAccount);
});

export const deleteUserAccountHandler = catchAsync(async (req, res, next) => {
  const userAccountId = req.params.id as string;
  await deleteUserAccountById(userAccountId);
  res.status(204).send();
});
