/*
  Warnings:

  - A unique constraint covering the columns `[etudiantId,anneeUnivId,annee]` on the table `annee_notes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "annee_notes_annee_key";

-- DropIndex
DROP INDEX "annee_notes_etudiantId_anneeUnivId_key";

-- CreateIndex
CREATE UNIQUE INDEX "annee_notes_etudiantId_anneeUnivId_annee_key" ON "annee_notes"("etudiantId", "anneeUnivId", "annee");
