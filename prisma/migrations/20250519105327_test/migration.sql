/*
  Warnings:

  - You are about to drop the column `departement` on the `users` table. All the data in the column will be lost.
  - Added the required column `departementId` to the `annees_universitaires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "annees_universitaires" ADD COLUMN     "departementId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "departement",
ADD COLUMN     "departementId" TEXT;

-- DropEnum
DROP TYPE "Departement";

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chefId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annees_universitaires" ADD CONSTRAINT "annees_universitaires_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
