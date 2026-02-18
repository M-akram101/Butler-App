-- CreateTable
CREATE TABLE "ReceiptItems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "receipt_id" TEXT NOT NULL,

    CONSTRAINT "ReceiptItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReceiptItems" ADD CONSTRAINT "ReceiptItems_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
