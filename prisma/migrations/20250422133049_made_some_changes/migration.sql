/*
  Warnings:

  - The values [chef_departement] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `departementId` on the `etudiants` table. All the data in the column will be lost.
  - You are about to drop the `canevas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notes_modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `progression_etudiant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `releves_notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `semestres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unites_enseignement` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'etudiant');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "canevas" DROP CONSTRAINT "canevas_departementId_fkey";

-- DropForeignKey
ALTER TABLE "departements" DROP CONSTRAINT "departements_chefId_fkey";

-- DropForeignKey
ALTER TABLE "etudiants" DROP CONSTRAINT "etudiants_departementId_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_uniteEnseignementId_fkey";

-- DropForeignKey
ALTER TABLE "notes_modules" DROP CONSTRAINT "notes_modules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "notes_modules" DROP CONSTRAINT "notes_modules_releveNotesId_fkey";

-- DropForeignKey
ALTER TABLE "progression_etudiant" DROP CONSTRAINT "progression_etudiant_etudiantId_fkey";

-- DropForeignKey
ALTER TABLE "releves_notes" DROP CONSTRAINT "releves_notes_etudiantId_fkey";

-- DropForeignKey
ALTER TABLE "releves_notes" DROP CONSTRAINT "releves_notes_semestreId_fkey";

-- DropForeignKey
ALTER TABLE "semestres" DROP CONSTRAINT "semestres_canevasId_fkey";

-- DropForeignKey
ALTER TABLE "unites_enseignement" DROP CONSTRAINT "unites_enseignement_semestreId_fkey";

-- AlterTable
ALTER TABLE "etudiants" DROP COLUMN "departementId",
ALTER COLUMN "dateNaissance" DROP NOT NULL,
ALTER COLUMN "lieuNaissance" DROP NOT NULL,
ALTER COLUMN "domaine" DROP NOT NULL,
ALTER COLUMN "filiere" DROP NOT NULL,
ALTER COLUMN "specialite" DROP NOT NULL,
ALTER COLUMN "diplomeType" DROP NOT NULL,
ALTER COLUMN "anneeUniversitaireDebut" DROP NOT NULL,
ALTER COLUMN "progression" SET DEFAULT 'initial';

-- DropTable
DROP TABLE "canevas";

-- DropTable
DROP TABLE "departements";

-- DropTable
DROP TABLE "modules";

-- DropTable
DROP TABLE "notes_modules";

-- DropTable
DROP TABLE "progression_etudiant";

-- DropTable
DROP TABLE "releves_notes";

-- DropTable
DROP TABLE "semestres";

-- DropTable
DROP TABLE "unites_enseignement";

-- DropEnum
DROP TYPE "ProgressionStatut";

-- DropEnum
DROP TYPE "ReleveStatus";
