-- DropIndex
DROP INDEX "Receipt_account_id_idx";

-- CreateIndex
CREATE INDEX "Receipt_account_id_is_deleted_idx" ON "Receipt"("account_id", "is_deleted");
