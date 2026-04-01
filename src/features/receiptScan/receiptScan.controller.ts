import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import { confirmReceipt, scanReceipt } from './receiptScan.service';

export const scanReceiptHandler = catchAsync(async (req, res) => {
  const file = req.file;
  const accountId = req.params.accountId;
  if (!accountId) throw new AppError('Missing account id !', 401);

  if (!file) {
    throw new AppError('File is required', 400);
  }

  const result = await scanReceipt(file);

  sendSuccess(res, result);
});

export const confirmReceiptHandler = catchAsync(async (req, res) => {
  const userId = res.locals.id;
  const data = req.body;

  const receipt = await confirmReceipt(data, userId);

  sendSuccess(res, receipt);
});
