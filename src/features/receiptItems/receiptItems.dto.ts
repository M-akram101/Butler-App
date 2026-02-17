import * as z from 'zod';
// model ReceiptItems {
//   id String @id @default(uuid())
//   quantity Int
//   price Float
//   // Relations inside
//   receiptId String @map("receipt_id")

const ReceiptItemsSchema = z.object({
  quantity: z.number().int().positive(),
  price: z.float64(),
  //   receiptId: z.string().uuid(),
});

export const ReceiptItemsCreateSchema = ReceiptItemsSchema;
export const ReceiptItemsCreateOutSchema = ReceiptItemsSchema.extend({
  id: z.string().uuid(),
});
export const ReceiptItemsUpdateSchema = ReceiptItemsSchema.partial().omit({
  //   receiptId: true,
});

export type CreateReceiptItemsDTO = z.infer<typeof ReceiptItemsCreateSchema>;
export type CreateReceiptItemsOutDTO = z.infer<
  typeof ReceiptItemsCreateOutSchema
>;
export type UpdateReceiptItemsDTO = z.infer<typeof ReceiptItemsUpdateSchema>;

// Params Schema
export const receiptItemsIdParamSchema = z.object({
  id: z.string().uuid(),
});
