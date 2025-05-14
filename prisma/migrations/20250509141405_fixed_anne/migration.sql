/*
  Warnings:

  - You are about to drop the column `mention` on the `annee_notes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[annee]` on the table `annee_notes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "annee_notes" DROP COLUMN "mention";

-- CreateIndex
CREATE UNIQUE INDEX "annee_notes_annee_key" ON "annee_notes"("annee");
