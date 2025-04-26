/*
  Warnings:

  - The values [metadata,data,completed] on the enum `EtudiantProgression` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `setupCompleted` on the `etudiants` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EtudiantProgression_new" AS ENUM ('initial', 'informationComplete', 'transcriptConfigured', 'transcriptFilled');
ALTER TABLE "etudiants" ALTER COLUMN "progression" DROP DEFAULT;
ALTER TABLE "etudiants" ALTER COLUMN "progression" TYPE "EtudiantProgression_new" USING ("progression"::text::"EtudiantProgression_new");
ALTER TYPE "EtudiantProgression" RENAME TO "EtudiantProgression_old";
ALTER TYPE "EtudiantProgression_new" RENAME TO "EtudiantProgression";
DROP TYPE "EtudiantProgression_old";
ALTER TABLE "etudiants" ALTER COLUMN "progression" SET DEFAULT 'initial';
COMMIT;

-- AlterTable
ALTER TABLE "etudiants" DROP COLUMN "setupCompleted";
