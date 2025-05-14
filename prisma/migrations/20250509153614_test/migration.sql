/*
  Warnings:

  - Added the required column `niveau` to the `annees_universitaires` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnmumNiveau" AS ENUM ('L1', 'L2', 'L3');

-- AlterTable
ALTER TABLE "annees_universitaires" ADD COLUMN     "niveau" "EnmumNiveau" NOT NULL;
