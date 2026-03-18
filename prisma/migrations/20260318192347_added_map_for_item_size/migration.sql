/*
  Warnings:

  - You are about to drop the column `itemSize` on the `ReceiptItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReceiptItems" DROP COLUMN "itemSize",
ADD COLUMN     "item_size" TEXT;
