/*
  Warnings:

  - Added the required column `statut` to the `annee_notes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "statut" AS ENUM ('PASSED', 'PASSED_WITH_DEBT', 'FAILED');

-- AlterTable
ALTER TABLE "annee_notes" ADD COLUMN     "statut" "statut" NOT NULL;
