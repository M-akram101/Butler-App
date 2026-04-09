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
  console.log('Reached Hereeeee');
  const newAccount = await prisma.account.create({
    data: {
      name: data.name,
      type: data.type,
      address: data.address,
      capAmount: data.capAmount,
      area: data.area,
      userAccounts: {
        create: { user: { connect: { id: userId } }, role: 'ADMIN' },
      },
    },
    // Essential for the joined object to b returned
    include: { userAccounts: true },
  });
  // Map to DTO
  const accountData: CreateAccountOutDTO = {
    id: newAccount.id,
    name: newAccount.name,
    type: newAccount.type,
    address: newAccount.address,
    capAmount: newAccount.capAmount,
    area: newAccount.area,
    userAccounts: newAccount.userAccounts.map((userAcc) => ({
      userId: userAcc.userId,
      role: userAcc.role,
    })),
  };

  return accountData;
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
      userAccounts: true,
    },
  });
  if (!account) {
    throw new AppError('Account not found', 404);
  }

  return account;
};

// Specific for validating user has this account
export const getAccountForValidation = async (id: string, userId: string) => {
  const account = await prisma.account.findFirst({
    where: { id, userAccounts: { some: { userId, accountId: id } } },
  });
  if (!account) throw new AppError('Invalid accountId !');
  return account;
};

export const updateAccountById = async (id: string, data: UpdateAccountDTO) => {
  const cleanedData = cleanForPrismaUpdate(data);

  // Ignore nested relations if present
  const { userAccounts, receipts, ...scalarFields } = cleanedData;

  if (Object.keys(scalarFields).length === 0)
    throw new AppError('No fields to update', 400);

  const updatedAccount = await prisma.account.update({
    where: { id },
    data: scalarFields,
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
