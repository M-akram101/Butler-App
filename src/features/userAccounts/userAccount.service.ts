import { number } from 'zod';
import { prisma } from '../../prismaClient';
import { AppError } from '../../utils/appError';
import { cleanForPrismaUpdate } from '../../utils/stripUndefined';
import type {
  CreateUserAccountOutDTO,
  UpdateUserAccountDTO,
} from './userAccount.dto';

export const createUserAccount = async (
  userId: string,
  accountId: string,
): Promise<CreateUserAccountOutDTO> => {
  const newUserAccount = await prisma.userAccount.create({
    data: {
      userId,
      accountId,
    },
  });

  return newUserAccount;
};

// Gets all users in a certain account
export const getAllUsersInAccountByAccountId = async (accountId: string) => {
  const userAccounts = await prisma.userAccount.findMany({
    where: { accountId, isDeleted: false },
    select: {
      id: true,
      role: true,
      accountId: true,
      account: { select: { id: true, name: true, type: true, area: true } },
    },
  });
  return userAccounts;
};
// Gets all accounts by a user
export const getAllAccountsByUserByUserId = async (userId: string) => {
  const userAccounts = await prisma.userAccount.findMany({
    where: { userId, isDeleted: false },
    select: {
      id: true,

      role: true,
      account: { select: { id: true, name: true, type: true, area: true } },
    },
  });

  // Validate user is within this account

  // if (!(userId in userAccounts)) throw new AppError('Invalid Account Id', 400);

  return userAccounts;
};

export const getUserAccountById = async (id: string) => {
  const userAccount = await prisma.userAccount.findFirstOrThrow({
    where: { id, isDeleted: false },
    select: {
      userId: true,
      accountId: true,
      role: true,
    },
  });

  return userAccount;
};

// Updates a user role to admin, but makes sveral checks:
// 1. checks of the user changing is admin on this specific account
// 2. checks if user being changed is not already an admin
export const updateUserRoleById = async (
  id: string,
  userId: string,
  accountId: string,
  data: UpdateUserAccountDTO,
) => {
  const cleanedData = cleanForPrismaUpdate(data);

  if (Object.keys(cleanedData).length === 0)
    throw new AppError('No fields to update', 400);

  const updatedUserAccount = await prisma.userAccount.update({
    where: {
      id,
      role: 'CONTRIBUTOR',
      account: { userAccounts: { some: { userId, role: 'ADMIN' } } },
    },
    data: cleanedData,
    select: {
      id: true,
      userId: true,
      accountId: true,
      role: true,
    },
  });
  if (!updatedUserAccount)
    throw new AppError('Not authorized or user account not found', 403);
  // if (updated.count === 0)
  //   throw new AppError('Not authorized or user account not found', 403);

  return updatedUserAccount;
};

export const deleteUserAccountById = async (id: string) => {
  const updatedUserAccount = await prisma.userAccount.update({
    where: { id },
    data: { isDeleted: true },
  });

  return updatedUserAccount;
};
