import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import type { CreateAccountDTO, UpdateAccountDTO } from './account.dto';
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccountsByUserId,
  updateAccount,
} from './account.service';

export const createAccountHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  console.log('Body coming from client', req.body);

  const data: CreateAccountDTO = { ...req.body };
  const account = await createAccount(data, userId);
  sendSuccess(res, account);
});
export const getAllAccountsByUserIdHandler = catchAsync(
  async (req, res, next) => {
    const userId = res.locals.user.id;
    const accounts = await getAllAccountsByUserId(userId);
    sendSuccess(res, accounts);
  },
);
export const getAccountByIdHandler = catchAsync(async (req, res, next) => {
  const accountId = req.params.id;
  if (!accountId || Array.isArray(accountId)) {
    throw new AppError('Missing AccountId!', 400);
  }
  const account = await getAccountById(accountId);
  sendSuccess(res, account);
});
export const updateAccountHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const data: UpdateAccountDTO = req.body;
  const account = await updateAccount(userId, data);
  sendSuccess(res, account);
});

export const deleteAccountHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  await deleteAccount(userId);
  res.status(204).send();
});
