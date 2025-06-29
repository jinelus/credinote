/*
  Warnings:

  - You are about to drop the column `email` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `organizations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "organizations_email_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "email",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
