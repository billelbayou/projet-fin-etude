/*
  Warnings:

  - You are about to drop the column `anneeId` on the `annee_notes` table. All the data in the column will be lost.
  - You are about to drop the column `annee` on the `annees_universitaires` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[etudiantId,anneeUnivId]` on the table `annee_notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `annee` to the `annee_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anneeUnivId` to the `annee_notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "annee_notes" DROP CONSTRAINT "annee_notes_anneeId_fkey";

-- DropIndex
DROP INDEX "annee_notes_etudiantId_anneeId_key";

-- DropIndex
DROP INDEX "annees_universitaires_annee_key";

-- AlterTable
ALTER TABLE "annee_notes" DROP COLUMN "anneeId",
ADD COLUMN     "annee" TEXT NOT NULL,
ADD COLUMN     "anneeUnivId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "annees_universitaires" DROP COLUMN "annee";

-- CreateIndex
CREATE UNIQUE INDEX "annee_notes_etudiantId_anneeUnivId_key" ON "annee_notes"("etudiantId", "anneeUnivId");

-- AddForeignKey
ALTER TABLE "annee_notes" ADD CONSTRAINT "annee_notes_anneeUnivId_fkey" FOREIGN KEY ("anneeUnivId") REFERENCES "annees_universitaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
