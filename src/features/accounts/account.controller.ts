import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import type { CreateAccountDTO, UpdateAccountDTO } from './account.dto';
import {
  createAccount,
  deleteAccountById,
  getAccountById,
  getAllAccountsByUserId,
  updateAccountById,
} from './account.service';

export const createAccountHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;

  const data: CreateAccountDTO = { ...req.body };
  const account = await createAccount(data, userId);
  sendSuccess(res, account);
});

export const getAllAccountsHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const accounts = await getAllAccountsByUserId(userId);
  sendSuccess(res, accounts);
});

export const getAccountHandler = catchAsync(async (req, res, next) => {
  const accountId = req.params.id as string;

  const account = await getAccountById(accountId);
  sendSuccess(res, account);
});

export const updateAccountHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id as string;
  const data: UpdateAccountDTO = req.body;
  const account = await updateAccountById(id, data);
  sendSuccess(res, account);
});

export const deleteAccountHandler = catchAsync(async (req, res, next) => {
  const accountId = req.params.id as string;
  await deleteAccountById(accountId);
  res.status(204).send();
});
