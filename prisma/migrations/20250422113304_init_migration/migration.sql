-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'chef_departement', 'etudiant');

-- CreateEnum
CREATE TYPE "DiplomeType" AS ENUM ('licence', 'master');

-- CreateEnum
CREATE TYPE "EtudiantProgression" AS ENUM ('initial', 'metadata', 'data', 'completed');

-- CreateEnum
CREATE TYPE "ReleveStatus" AS ENUM ('brouillon', 'soumis', 'valide', 'rejete');

-- CreateEnum
CREATE TYPE "ProgressionStatut" AS ENUM ('locked', 'metadata', 'data', 'completed');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etudiants" (
    "id" TEXT NOT NULL,
    "numeroInscription" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "lieuNaissance" TEXT NOT NULL,
    "domaine" TEXT NOT NULL,
    "filiere" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "diplomeType" "DiplomeType" NOT NULL,
    "anneeUniversitaireDebut" TEXT NOT NULL,
    "progression" "EtudiantProgression" NOT NULL,
    "departementId" TEXT NOT NULL,

    CONSTRAINT "etudiants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departements" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "faculte" TEXT NOT NULL,
    "chefId" TEXT NOT NULL,

    CONSTRAINT "departements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canevas" (
    "id" TEXT NOT NULL,
    "departementId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "anneeDebut" TEXT NOT NULL,
    "anneeFin" TEXT NOT NULL,
    "diplomeType" "DiplomeType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "canevas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semestres" (
    "id" TEXT NOT NULL,
    "canevasId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "anneeEtude" INTEGER NOT NULL,
    "totalCredits" INTEGER NOT NULL,

    CONSTRAINT "semestres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unites_enseignement" (
    "id" TEXT NOT NULL,
    "semestreId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "intitule" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "creditsTotal" INTEGER NOT NULL,
    "coefficientTotal" INTEGER NOT NULL,

    CONSTRAINT "unites_enseignement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "uniteEnseignementId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "intitule" TEXT NOT NULL,
    "coefficient" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "releves_notes" (
    "id" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "semestreId" TEXT NOT NULL,
    "anneeUniversitaire" TEXT NOT NULL,
    "moyenneSemestre" DOUBLE PRECISION,
    "creditsCumules" INTEGER,
    "status" "ReleveStatus" NOT NULL DEFAULT 'brouillon',
    "imageOriginal" TEXT,
    "decision" TEXT,
    "commentaireAdmin" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "releves_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes_modules" (
    "id" TEXT NOT NULL,
    "releveNotesId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "sessionType" TEXT NOT NULL,
    "creditObtenu" INTEGER NOT NULL,

    CONSTRAINT "notes_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progression_etudiant" (
    "id" TEXT NOT NULL,
    "etudiantId" TEXT NOT NULL,
    "anneeEtude" INTEGER NOT NULL,
    "statut" "ProgressionStatut" NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progression_etudiant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "etudiants_numeroInscription_key" ON "etudiants"("numeroInscription");

-- CreateIndex
CREATE UNIQUE INDEX "departements_chefId_key" ON "departements"("chefId");

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departements" ADD CONSTRAINT "departements_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canevas" ADD CONSTRAINT "canevas_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestres" ADD CONSTRAINT "semestres_canevasId_fkey" FOREIGN KEY ("canevasId") REFERENCES "canevas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unites_enseignement" ADD CONSTRAINT "unites_enseignement_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_uniteEnseignementId_fkey" FOREIGN KEY ("uniteEnseignementId") REFERENCES "unites_enseignement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "releves_notes" ADD CONSTRAINT "releves_notes_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "releves_notes" ADD CONSTRAINT "releves_notes_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes_modules" ADD CONSTRAINT "notes_modules_releveNotesId_fkey" FOREIGN KEY ("releveNotesId") REFERENCES "releves_notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes_modules" ADD CONSTRAINT "notes_modules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progression_etudiant" ADD CONSTRAINT "progression_etudiant_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
