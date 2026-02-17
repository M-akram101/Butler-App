import { prisma } from '../../prismaClient';
import { AppError } from '../../utils/appError';
import { cleanForPrismaUpdate } from '../../utils/stripUndefined';
import type {
  CreateAccountDTO,
  CreateAccountOutDTO,
  UpdateAccountDTO,
} from './account.dto';

export const createAccount = async (
  data: CreateAccountDTO,
  userId: string,
): Promise<CreateAccountOutDTO> => {
  //   do we need this check ?? const existingAccount

  const newAccount = await prisma.account.create({
    data: {
      name: data.name,
      type: data.type,
      address: data.address,
      capAmount: data.capAmount,
      area: data.area,
      userId,
    },
  });

  // Map to DTO
  const accountData: CreateAccountOutDTO = {
    id: newAccount.id,
    name: newAccount.name,
    type: newAccount.type,
    address: newAccount.address,
    capAmount: newAccount.capAmount,
    area: newAccount.area,
  };

  return accountData;
};

export const getAllAccountsByUserId = async (userId: string) => {
  const accounts = await prisma.account.findMany({
    where: { userId, isDeleted: false },
    select: {
      id: true,
      name: true,
      type: true,
      address: true,
      area: true,
      capAmount: true,
    },
  });

  return accounts;
};

export const getAccountById = async (id: string) => {
  const account = await prisma.account.findFirst({
    where: { id, isDeleted: false },
    select: {
      name: true,
      type: true,
      address: true,
      area: true,
      capAmount: true,
      userId: true,
    },
  });
  if (!account) {
    throw new AppError('Account not found', 404);
  }

  return account;
};

// Specific for validating user has this account
export const getAccountForValidation = async (id: string) => {
  const account = await prisma.account.findFirst({
    where: { id, isDeleted: false },
    select: {
      userId: true,
    },
  });
  if (!account) throw new AppError('Invalid accountId !');
  return account;
};

export const updateAccountById = async (id: string, data: UpdateAccountDTO) => {
  const cleanedData = cleanForPrismaUpdate(data);

  if (Object.keys(cleanedData).length === 0)
    throw new AppError('No fields to update', 400);

  const updatedAccount = await prisma.account.update({
    where: { id },
    data: cleanedData,
    select: {
      name: true,
      type: true,
      address: true,
      area: true,
      capAmount: true,
    },
  });

  return updatedAccount;
};

export const deleteAccountById = async (id: string) => {
  const updatedAccount = await prisma.account.update({
    where: { id },
    data: { isDeleted: true },
  });

  return updatedAccount;
};
