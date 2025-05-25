/*
  Warnings:

  - You are about to drop the column `date_paid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "date_paid",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "orders_id_client_idx" ON "orders"("id_client");

-- CreateIndex
CREATE INDEX "payments_id_client_idx" ON "payments"("id_client");
