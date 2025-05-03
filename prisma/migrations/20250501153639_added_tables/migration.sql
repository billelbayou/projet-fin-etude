/*
  Warnings:

  - You are about to drop the column `diplomeType` on the `etudiants` table. All the data in the column will be lost.
  - The `progression` column on the `etudiants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeDiplome" AS ENUM ('licence', 'master');

-- CreateEnum
CREATE TYPE "ProgressionEtudiant" AS ENUM ('initial', 'informationComplete', 'transcriptConfigured', 'transcriptFilled');

-- DropForeignKey
ALTER TABLE "etudiants" DROP CONSTRAINT "etudiants_id_fkey";

-- AlterTable
ALTER TABLE "etudiants" DROP COLUMN "diplomeType",
ADD COLUMN     "typeDiplome" "TypeDiplome" DEFAULT 'licence',
DROP COLUMN "progression",
ADD COLUMN     "progression" "ProgressionEtudiant" NOT NULL DEFAULT 'initial';

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "DiplomeType";

-- DropEnum
DROP TYPE "EtudiantProgression";

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semestres" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semestres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unites" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "semestreId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "uniteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semestre_notes" (
    "id" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "semestreId" TEXT NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semestre_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unite_notes" (
    "id" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "uniteId" TEXT NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unite_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_notes" (
    "id" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "semestre_notes_etudiantId_semestreId_key" ON "semestre_notes"("etudiantId", "semestreId");

-- CreateIndex
CREATE UNIQUE INDEX "unite_notes_etudiantId_uniteId_key" ON "unite_notes"("etudiantId", "uniteId");

-- CreateIndex
CREATE UNIQUE INDEX "module_notes_etudiantId_moduleId_key" ON "module_notes"("etudiantId", "moduleId");

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unites" ADD CONSTRAINT "unites_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_uniteId_fkey" FOREIGN KEY ("uniteId") REFERENCES "unites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestre_notes" ADD CONSTRAINT "semestre_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestre_notes" ADD CONSTRAINT "semestre_notes_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unite_notes" ADD CONSTRAINT "unite_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unite_notes" ADD CONSTRAINT "unite_notes_uniteId_fkey" FOREIGN KEY ("uniteId") REFERENCES "unites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_notes" ADD CONSTRAINT "module_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_notes" ADD CONSTRAINT "module_notes_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
