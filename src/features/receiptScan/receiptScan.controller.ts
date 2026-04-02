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

  const scanResult = await scanReceipt(file);
  const result = { ...scanResult, accountId };
  sendSuccess(res, result);
});

export const confirmReceiptHandler = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  console.log('This is userId in controlllerrrrrrrrrrrrrrrrrrrr:', userId);
  const data = req.body;

  const receipt = await confirmReceipt(data, userId);

  sendSuccess(res, receipt);
});
