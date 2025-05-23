/*
  Warnings:

  - Added the required column `updatedAt` to the `etudiants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SoumissionStatut" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REVISED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnmumNiveau" ADD VALUE 'M1';
ALTER TYPE "EnmumNiveau" ADD VALUE 'M2';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProgressionEtudiant" ADD VALUE 'soumis';
ALTER TYPE "ProgressionEtudiant" ADD VALUE 'valide';
ALTER TYPE "ProgressionEtudiant" ADD VALUE 'rejete';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ENSEIGNANT';

-- AlterEnum
ALTER TYPE "TypeDiplome" ADD VALUE 'doctorat';

-- AlterTable
ALTER TABLE "annee_notes" ALTER COLUMN "credits" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "etudiants" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "module_notes" ADD COLUMN     "uniteNoteId" TEXT,
ALTER COLUMN "credits" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "semestre_notes" ALTER COLUMN "credits" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "unite_notes" ADD COLUMN     "semestreNoteId" TEXT,
ALTER COLUMN "credits" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "soumissions" (
    "id" TEXT NOT NULL,
    "anneeNoteId" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "chefDepartementId" TEXT NOT NULL,
    "statut" "SoumissionStatut" NOT NULL,
    "dateSoumission" TIMESTAMP(3) NOT NULL,
    "dateValidation" TIMESTAMP(3),
    "commentaire" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soumissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "soumissions_anneeNoteId_key" ON "soumissions"("anneeNoteId");

-- AddForeignKey
ALTER TABLE "module_notes" ADD CONSTRAINT "module_notes_uniteNoteId_fkey" FOREIGN KEY ("uniteNoteId") REFERENCES "unite_notes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unite_notes" ADD CONSTRAINT "unite_notes_semestreNoteId_fkey" FOREIGN KEY ("semestreNoteId") REFERENCES "semestre_notes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soumissions" ADD CONSTRAINT "soumissions_anneeNoteId_fkey" FOREIGN KEY ("anneeNoteId") REFERENCES "annee_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soumissions" ADD CONSTRAINT "soumissions_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soumissions" ADD CONSTRAINT "soumissions_chefDepartementId_fkey" FOREIGN KEY ("chefDepartementId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
