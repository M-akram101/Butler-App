/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedBy` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Receipt` table. All the data in the column will be lost.
  - Added the required column `uploaded_by` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_user_id_fkey";

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "updatedAt",
DROP COLUMN "uploadedBy",
DROP COLUMN "user_id",
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "uploaded_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
