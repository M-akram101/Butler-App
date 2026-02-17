import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import type { CreateReceiptDTO, UpdateReceiptDTO } from './receipt.dto';
import {
  createReceipt,
  deleteReceiptById,
  getAllReceiptsByAccountId,
  getReceiptById,
  updateReceiptById,
} from './receipt.service';

export const createReceiptHandler = catchAsync(async (req, res, next) => {
  const userId = res.locals.user.id;
  const data: CreateReceiptDTO = { ...req.body };
  const receipt = await createReceipt(data, userId);
  sendSuccess(res, receipt);
});

export const getAllReceiptsHandler = catchAsync(async (req, res, next) => {
  const accountId = req.params.id as any;
  const receipts = await getAllReceiptsByAccountId(accountId);
  sendSuccess(res, receipts);
});

export const getReceiptHandler = catchAsync(async (req, res, next) => {
  const receiptId = req.params.id as string;

  const receipt = await getReceiptById(receiptId);
  sendSuccess(res, receipt);
});

export const updateReceiptHandler = catchAsync(async (req, res, next) => {
  const receiptId = req.params.id as string;
  const data: UpdateReceiptDTO = req.body;
  const receipt = await updateReceiptById(receiptId, data);
  sendSuccess(res, receipt);
});

export const deleteReceiptHandler = catchAsync(async (req, res, next) => {
  const receiptId = req.params.id as string;
  await deleteReceiptById(receiptId);
  res.status(204).send();
});
