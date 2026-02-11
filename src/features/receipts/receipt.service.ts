import { prisma } from '../../prismaClient';
import { AppError } from '../../utils/appError';
import { cleanForPrismaUpdate } from '../../utils/stripUndefined';
import type {
  CreateReceiptDTO,
  CreateReceiptOutDTO,
  UpdateReceiptDTO,
} from './receipt.dto';

export const createReceipt = async (
  data: CreateReceiptDTO,
  userId: string,
): Promise<CreateReceiptOutDTO> => {
  const newReceipt = await prisma.receipt.create({
    data: {
      totalPrice: data.totalPrice,
      accountId: data.accountId,
      uploadedBy: userId,
    },
  });

  // Map to DTO
  const receiptData: CreateReceiptOutDTO = {
    id: newReceipt.id,
    uploadedBy: newReceipt.uploadedBy,
    totalPrice: newReceipt.totalPrice,
    accountId: newReceipt.accountId,
  };

  return receiptData;
};

export const getAllReceiptsByAccountId = async (accountId: string) => {
  const receipts = await prisma.receipt.findMany({
    where: { accountId, isDeleted: false },
    select: {
      id: true,
      totalPrice: true,
      accountId: true,
      uploadedBy: true,
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
    },
  });

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
