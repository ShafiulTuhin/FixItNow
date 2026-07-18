/*
  Warnings:

  - You are about to drop the column `duration` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "duration",
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "skills" TEXT[];
