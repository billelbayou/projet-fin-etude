-- AlterTable
ALTER TABLE "etudiants" ALTER COLUMN "dateNaissance" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "lieuNaissance" SET DEFAULT '',
ALTER COLUMN "domaine" SET DEFAULT '',
ALTER COLUMN "filiere" SET DEFAULT '',
ALTER COLUMN "specialite" SET DEFAULT '',
ALTER COLUMN "diplomeType" SET DEFAULT 'licence',
ALTER COLUMN "anneeUniversitaireDebut" SET DEFAULT '';
