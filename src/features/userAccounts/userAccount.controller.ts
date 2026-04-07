import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import type {
  CreateUserAccountDTO,
  UpdateUserAccountDTO,
} from './userAccount.dto';
import {
  createUserAccount,
  deleteUserAccountById,
  getAllUserAccountsByAccountId,
  getUserAccountById,
  updateUserRoleById,
} from './userAccount.service';

export const createUserAccountHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const accountId = req.params.id as string;
  const userAccount = await createUserAccount(userId, accountId);
  sendSuccess(res, userAccount);
});

export const getAllUserAccountsHandler = catchAsync(async (req, res, next) => {
  const accountId = req.params.id as any;
  const userId = res.locals.user.id;
  const userAccounts = await getAllUserAccountsByAccountId(accountId, userId);
  sendSuccess(res, userAccounts);
});

export const getUserAccountHandler = catchAsync(async (req, res, next) => {
  const userAccountId = req.params.id as string;

  const userAccount = await getUserAccountById(userAccountId);
  sendSuccess(res, userAccount);
});

export const updateUserRoleHandler = catchAsync(async (req, res, next) => {
  const userAccountId = req.params.id as string;
  const accountId = req.params.id as string;
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
