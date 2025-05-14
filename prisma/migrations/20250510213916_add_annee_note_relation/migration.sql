/*
  Warnings:

  - A unique constraint covering the columns `[etudiantId,semestreId,anneeNoteId]` on the table `semestre_notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anneeNoteId` to the `semestre_notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "semestre_notes_etudiantId_semestreId_key";

-- AlterTable
ALTER TABLE "semestre_notes" ADD COLUMN     "anneeNoteId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "semestre_notes_etudiantId_semestreId_anneeNoteId_key" ON "semestre_notes"("etudiantId", "semestreId", "anneeNoteId");

-- AddForeignKey
ALTER TABLE "semestre_notes" ADD CONSTRAINT "semestre_notes_anneeNoteId_fkey" FOREIGN KEY ("anneeNoteId") REFERENCES "annee_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
