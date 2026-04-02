-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "merchant_address" TEXT,
ADD COLUMN     "merchant_name" TEXT;

-- AlterTable
ALTER TABLE "ReceiptItems" ADD COLUMN     "itemSize" TEXT;
