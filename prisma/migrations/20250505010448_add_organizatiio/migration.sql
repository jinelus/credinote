/*
  Warnings:

  - You are about to drop the column `business_id` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_business_id_fkey";

-- DropIndex
DROP INDEX "clients_business_id_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "business_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_organization_id_key" ON "clients"("organization_id");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
