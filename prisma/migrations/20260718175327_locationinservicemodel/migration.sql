/*
  Warnings:

  - You are about to drop the column `location` on the `techniciansProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "techniciansProfile" DROP COLUMN "location";
