import * as z from 'zod';
// model ReceiptItems {
//   id String @id @default(uuid())
//   quantity Int
//   price Float
//   // Relations inside
//   receiptId String @map("receipt_id")

const ReceiptItemsSchema = z.object({
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  name: z.string().min(1),
  itemSize: z.string().min(1).max(30).nullable(),
  //   receiptId: z.string().uuid(),
});

export const ReceiptItemsCreateSchema = ReceiptItemsSchema;
// export const ReceiptItemsCreateOutSchema = ReceiptItemsSchema.extend({
//   id: z.string().uuid(),
// });
export const ReceiptItemsOutSchema = ReceiptItemsCreateSchema.extend({
  id: z.string().uuid(),
});

export const ReceiptItemsUpdateSchema = ReceiptItemsSchema.partial().omit({
  //   receiptId: true,
});

export type CreateReceiptItemsDTO = z.infer<typeof ReceiptItemsCreateSchema>;
export type ReceiptItemsOutDTO = z.infer<typeof ReceiptItemsOutSchema>;
export type UpdateReceiptItemsDTO = z.infer<typeof ReceiptItemsUpdateSchema>;

// Params Schema
export const receiptItemsIdParamSchema = z.object({
  id: z.string().uuid(),
});
