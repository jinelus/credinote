/*
  Warnings:

  - You are about to alter the column `amount` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `total` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `role` on the `organizations` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- DropEnum
DROP TYPE "UserRole";
