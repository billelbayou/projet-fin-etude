-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'etudiant');

-- CreateEnum
CREATE TYPE "DiplomeType" AS ENUM ('licence', 'master');

-- CreateEnum
CREATE TYPE "EtudiantProgression" AS ENUM ('initial', 'metadata', 'data', 'completed');

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
    "dateNaissance" TIMESTAMP(3),
    "lieuNaissance" TEXT,
    "domaine" TEXT,
    "filiere" TEXT,
    "specialite" TEXT,
    "diplomeType" "DiplomeType" DEFAULT 'licence',
    "anneeUniversitaireDebut" TEXT,
    "progression" "EtudiantProgression" NOT NULL DEFAULT 'initial',
    "setupCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "etudiants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "etudiants_numeroInscription_key" ON "etudiants"("numeroInscription");

-- AddForeignKey
ALTER TABLE "etudiants" ADD CONSTRAINT "etudiants_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
