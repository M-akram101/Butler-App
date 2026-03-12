import * as z from 'zod';
import {
  ReceiptItemsCreateSchema,
  ReceiptItemsOutSchema,
} from '../receiptItems/receiptItems.dto';

const ReceiptSchema = z.object({
  totalPrice: z.number(),
  accountId: z.string().uuid(),
  receiptItems: z.array(ReceiptItemsCreateSchema).min(1),
});

export const ReceiptCreateSchema = ReceiptSchema;
// export const ReceiptCreateOutSchema = ReceiptSchema.extend({
//   id: z.string().uuid(),
//   uploadedBy: z.string().uuid(),
// });

export const ReceiptCreateOutSchema = z.object({
  id: z.string().uuid(),
  totalPrice: z.number(),
  accountId: z.string().uuid(),
  uploadedBy: z.string().uuid(),
  receiptItems: z.array(ReceiptItemsOutSchema),
});

export const ReceiptUpdateSchema = ReceiptSchema.partial().omit({
  accountId: true,
});

export type CreateReceiptDTO = z.infer<typeof ReceiptCreateSchema>;
export type CreateReceiptOutDTO = z.infer<typeof ReceiptCreateOutSchema>;
export type UpdateReceiptDTO = z.infer<typeof ReceiptUpdateSchema>;

// Params Schema
export const receiptIdParamSchema = z.object({
  id: z.string().uuid(),
});
