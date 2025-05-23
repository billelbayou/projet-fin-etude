/*
  Warnings:

  - Added the required column `nom` to the `annees_universitaires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "annees_universitaires" ADD COLUMN     "domaine" TEXT,
ADD COLUMN     "filiere" TEXT,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "specialite" TEXT;
