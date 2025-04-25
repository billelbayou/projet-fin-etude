/*
  Warnings:

  - You are about to drop the column `departementId` on the `etudiants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "etudiants" DROP COLUMN "departementId",
ADD COLUMN     "departement" TEXT,
ADD COLUMN     "setupCompleted" BOOLEAN NOT NULL DEFAULT false;
