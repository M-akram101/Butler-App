import prisma from '../../prismaClient';
import { extractTextFromImage } from '../../services/ocr.service';
import { parseReceipt } from '../../services/ocrParser.service';
import { AppError } from '../../utils/appError';
import { getAccountForValidation } from '../accounts/account.service';
import type {
  CreateReceiptDTO,
  CreateReceiptOutDTO,
} from '../receipts/receipt.dto';

export const scanReceipt = async (file: Express.Multer.File) => {
  const text = await extractTextFromImage(file.path);
  console.log('Text from Ocr: ', text);
  const parsed = await parseReceipt(text);

  return parsed;
};

export const confirmReceipt = async (
  data: CreateReceiptDTO,
  userId: string,
) => {
  const { accountId, receiptItems, totalPrice } = data;

  //  Validate account
  const accountData = await getAccountForValidation(accountId);

  if (userId !== accountData.userId) {
    throw new AppError('Invalid Account Id', 400);
  }

  // //  Validate totals (IMPORTANT)
  // const calculatedTotal = items.reduce(
  //   (sum, i) => sum + i.price * i.quantity,
  //   0
  // );

  // if (Math.abs(calculatedTotal - totalPrice) > 1) {
  //   throw new AppError("Total mismatch", 400);
  // }

  //  Create receipt
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
