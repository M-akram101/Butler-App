import { number } from 'zod';
import { prisma } from '../../prismaClient';
import { AppError } from '../../utils/appError';
import { cleanForPrismaUpdate } from '../../utils/stripUndefined';
import { getAccountForValidation } from '../accounts/account.service';
import type {
  CreateReceiptDTO,
  CreateReceiptOutDTO,
  UpdateReceiptDTO,
} from './receipt.dto';

export const createReceipt = async (
  data: CreateReceiptDTO,
  userId: string,
): Promise<CreateReceiptOutDTO> => {
  // Validate account exists
  const accountData = await getAccountForValidation(data.accountId);
  // Validate user has this account
  if (userId !== accountData.userId)
    throw new AppError('Invalid Account Id', 400);

  const newReceipt = await prisma.receipt.create({
    data: {
      totalPrice: data.totalPrice,
      merchantName: data.merchantName,
      merchantAddress: data.merchantAddress,
      accountId: data.accountId,
      uploadedBy: userId,
      receiptItems: {
        create: data.receiptItems.map((item) => ({
          name: item.name,
          itemSize: item.itemSize,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { receiptItems: true },
  });

  // Map to DTO
  const receiptData: CreateReceiptOutDTO = {
    id: newReceipt.id,
    merchantName: newReceipt.merchantName,
    merchantAddress: newReceipt.merchantAddress,
    uploadedBy: newReceipt.uploadedBy,
    totalPrice: newReceipt.totalPrice,
    accountId: newReceipt.accountId,
    receiptItems: newReceipt.receiptItems.map((item) => ({
      id: item.id,
      name: item.name,
      itemSize: item.itemSize,
      quantity: item.quantity,
      price: Number(item.price),
    })),
  };

  return receiptData;
};

export const getAllReceiptsByAccountId = async (
  accountId: string,
  userId: string,
) => {
  // Validate account exists
  const accountData = await getAccountForValidation(accountId);
  // Validate user has this account
  if (userId !== accountData.userId)
    throw new AppError('Invalid Account Id', 400);

  const receipts = await prisma.receipt.findMany({
    where: { accountId, isDeleted: false },
    select: {
      id: true,
      totalPrice: true,
      accountId: true,
      uploadedBy: true,
      receiptItems: true,
    },
  });

  return receipts;
};
// Need query to get receipts for certain months
// query to get receipts per store for certain months
//
export const getReceiptById = async (id: string) => {
  const receipt = await prisma.receipt.findFirst({
    where: { id, isDeleted: false },
    select: {
      id: true,
      totalPrice: true,
      accountId: true,
      uploadedBy: true,
      receiptItems: {
        select: {
          name: true,
          quantity: true,
          price: true,
        },
      },
    },
  });
  if (!receipt) {
    throw new AppError('Receipt not found', 404);
  }

  return receipt;
};

export const updateReceiptById = async (id: string, data: UpdateReceiptDTO) => {
  const cleanedData = cleanForPrismaUpdate(data);

  if (Object.keys(cleanedData).length === 0)
    throw new AppError('No fields to update', 400);

  const updatedReceipt = await prisma.receipt.update({
    where: { id },
    data: cleanedData,
    select: {
      id: true,
      totalPrice: true,
      accountId: true,
      uploadedBy: true,
      receiptItems: true,
    },
  });

  return updatedReceipt;
};

export const deleteReceiptById = async (id: string) => {
  const updatedReceipt = await prisma.receipt.update({
    where: { id },
    data: { isDeleted: true },
  });

  return updatedReceipt;
};
