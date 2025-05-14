/*
  Warnings:

  - You are about to drop the column `anneeUniversitaireDebut` on the `etudiants` table. All the data in the column will be lost.
  - Added the required column `anneeId` to the `semestres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "etudiants" DROP COLUMN "anneeUniversitaireDebut";

-- AlterTable
ALTER TABLE "semestres" ADD COLUMN     "anneeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "annees_universitaires" (
    "id" TEXT NOT NULL,
    "annee" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annees_universitaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annee_notes" (
    "id" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "anneeId" TEXT NOT NULL,
    "moyenne" DOUBLE PRECISION,
    "credits" INTEGER,
    "mention" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annee_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "annees_universitaires_annee_key" ON "annees_universitaires"("annee");

-- CreateIndex
CREATE UNIQUE INDEX "annee_notes_etudiantId_anneeId_key" ON "annee_notes"("etudiantId", "anneeId");

-- AddForeignKey
ALTER TABLE "annee_notes" ADD CONSTRAINT "annee_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annee_notes" ADD CONSTRAINT "annee_notes_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "annees_universitaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestres" ADD CONSTRAINT "semestres_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "annees_universitaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
