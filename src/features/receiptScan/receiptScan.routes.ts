import { Router } from 'express';
import { validate } from '../../middleware/validateRequest.middleware';

import { authenticate } from '../../middleware/auth.middleware';
import {
  confirmReceiptHandler,
  scanReceiptHandler,
} from './receiptScan.controller';
import { upload } from '../../middleware/upload.middleware';
import { ReceiptCreateSchema } from '../receipts/receipt.dto';

const router = Router();
router.post(
  '/scan',
  authenticate(),
  upload.single('file'), // multer
  scanReceiptHandler,
);

router.post(
  '/confirm',
  authenticate(),
  validate(ReceiptCreateSchema),
  confirmReceiptHandler,
);

export default router;
