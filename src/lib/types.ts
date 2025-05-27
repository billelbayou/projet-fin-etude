import { ProgressionEtudiant, $Enums } from "@prisma/client";

export const Domains = [
  "Mathématiques et Informatique",
  "Sciences et Technologie",
  "Agriculture et Environnement",
];

export const Filieres = {
  MI: ["Mathématiques", "Informatique"],
  ST: ["Sciences et Technologie"],
  AG: ["Agriculture", "Environnement"],
};

export const Specialites = {
  I: ["ISIL", "SI"],
  ST: [
    "Génie Electrique",
    "Genie mecanique",
    "Genie civil",
    "Genie energetique",
  ],
  AG: ["Agronomie", "Foresterie", "Environnement"],
};

export interface EtudiantUtilisateur {
  Utilisateur: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: $Enums.Role;
  };
  Etudiant?: {
    id: string;
    userId: string;
    departementId: string;
    matricule: string;
    dateNaissance: Date | null;
    lieuNaissance: string | null;
    domaine: string | null;
    filiere: string | null;
    specialite: string | null;
    anneeUniversitaireDebut: string | null;
    typeDiplome: "licence" | "master" | "doctorat" | null;
    progression: ProgressionEtudiant;
  };
}
