import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';

import { authenticate } from '../../middleware/authMiddleware';
import {
  createReceiptHandler,
  deleteReceiptHandler,
  getAllReceiptsHandler,
  getReceiptHandler,
  updateReceiptHandler,
} from './receipt.controller';

import { validateParams } from '../../middleware/validateParams';
import {
  ReceiptCreateSchema,
  receiptIdParamSchema,
  ReceiptUpdateSchema,
} from './receipt.dto';
import { accountIdParamSchema } from '../accounts/account.dto';

const router = Router();
router.post(
  '/',
  authenticate(),
  validate(ReceiptCreateSchema),
  createReceiptHandler,
);
router.get('/', authenticate(), getAllReceiptsHandler);
router.get(
  '/:id',
  authenticate(),
  validateParams(receiptIdParamSchema),
  getReceiptHandler,
);
router.patch(
  '/:id',
  authenticate(),
  validateParams(receiptIdParamSchema),
  validate(ReceiptUpdateSchema),
  updateReceiptHandler,
);
router.delete(
  '/:id',
  authenticate(),
  validateParams(accountIdParamSchema),
  deleteReceiptHandler,
);

export default router;
