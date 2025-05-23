/*
  Warnings:

  - You are about to drop the column `departementId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chefId]` on the table `departments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departementId` to the `etudiants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_departementId_fkey";

-- AlterTable
ALTER TABLE "etudiants" ADD COLUMN     "departementId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "departementId";

-- CreateIndex
CREATE UNIQUE INDEX "departments_chefId_key" ON "departments"("chefId");

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
