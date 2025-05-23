-- CreateEnum
CREATE TYPE "Departement" AS ENUM ('informatique', 'matematiques');

-- CreateEnum
CREATE TYPE "EnmumNiveau" AS ENUM ('L1', 'L2', 'L3');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CHEF_DEPARTEMENT', 'ETUDIANT');

-- CreateEnum
CREATE TYPE "TypeDiplome" AS ENUM ('licence', 'master');

-- CreateEnum
CREATE TYPE "ProgressionEtudiant" AS ENUM ('initial', 'informationComplete', 'transcriptConfigured', 'transcriptFilled');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "departement" "Departement" NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etudiants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3),
    "lieuNaissance" TEXT,
    "filiere" TEXT,
    "specialite" TEXT,
    "anneeUniversitaireDebut" TEXT,
    "typeDiplome" "TypeDiplome" DEFAULT 'licence',
    "progression" "ProgressionEtudiant" NOT NULL DEFAULT 'initial',

    CONSTRAINT "etudiants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annees_universitaires" (
    "id" TEXT NOT NULL,
    "niveau" "EnmumNiveau" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annees_universitaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annee_notes" (
    "id" TEXT NOT NULL,
    "annee" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "anneeUnivId" TEXT NOT NULL,
    "moyenne" DOUBLE PRECISION,
    "credits" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annee_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semestres" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "anneeId" TEXT NOT NULL,
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
    "anneeNoteId" TEXT NOT NULL,

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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "etudiants_userId_key" ON "etudiants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "etudiants_matricule_key" ON "etudiants"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "annee_notes_etudiantId_anneeUnivId_annee_key" ON "annee_notes"("etudiantId", "anneeUnivId", "annee");

-- CreateIndex
CREATE UNIQUE INDEX "semestre_notes_etudiantId_semestreId_anneeNoteId_key" ON "semestre_notes"("etudiantId", "semestreId", "anneeNoteId");

-- CreateIndex
CREATE UNIQUE INDEX "unite_notes_etudiantId_uniteId_key" ON "unite_notes"("etudiantId", "uniteId");

-- CreateIndex
CREATE UNIQUE INDEX "module_notes_etudiantId_moduleId_key" ON "module_notes"("etudiantId", "moduleId");

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annee_notes" ADD CONSTRAINT "annee_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annee_notes" ADD CONSTRAINT "annee_notes_anneeUnivId_fkey" FOREIGN KEY ("anneeUnivId") REFERENCES "annees_universitaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestres" ADD CONSTRAINT "semestres_anneeId_fkey" FOREIGN KEY ("anneeId") REFERENCES "annees_universitaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unites" ADD CONSTRAINT "unites_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_uniteId_fkey" FOREIGN KEY ("uniteId") REFERENCES "unites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestre_notes" ADD CONSTRAINT "semestre_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestre_notes" ADD CONSTRAINT "semestre_notes_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestre_notes" ADD CONSTRAINT "semestre_notes_anneeNoteId_fkey" FOREIGN KEY ("anneeNoteId") REFERENCES "annee_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unite_notes" ADD CONSTRAINT "unite_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unite_notes" ADD CONSTRAINT "unite_notes_uniteId_fkey" FOREIGN KEY ("uniteId") REFERENCES "unites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_notes" ADD CONSTRAINT "module_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_notes" ADD CONSTRAINT "module_notes_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
