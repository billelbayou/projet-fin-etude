/*
  Warnings:

  - Added the required column `credits` to the `module_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `semestre_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coefficient` to the `semestres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `semestres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `unite_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coefficient` to the `unites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `unites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "module_notes" ADD COLUMN     "credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "semestre_notes" ADD COLUMN     "credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "semestres" ADD COLUMN     "coefficient" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "unite_notes" ADD COLUMN     "credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "unites" ADD COLUMN     "coefficient" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "credits" INTEGER NOT NULL;
