import { Role, ProgressionEtudiant, TypeDiplome } from "@prisma/client";

export const Domains = [
  "Mathématiques et Informatique",
  "Sciences et Technologie",
];

export const Filieres = {
  MI: ["Mathématiques", "Informatique"],
  ST: ["Sciences et Technologie"],
};

export const Specialites = {
  I: ["ISIL", "SI"],
  ST: [
    "Génie Electrique",
    "Genie mecanique",
    "Genie civil",
    "Genie energetique",
  ],
};

export interface EtudiantUtilisateur {
  Utilisateur: {
    id: string;
    email: string;
    motDePasse: string;
    role: Role;
    nom: string;
    prenom: string;
    dateCreation: Date;
    dateModification: Date;
  };
  Etudiant: {
    id: string;
    numeroInscription: string;
    dateNaissance: Date | null;
    lieuNaissance: string | null;
    domaine: string | null;
    filiere: string | null;
    specialite: string | null;
    typeDiplome: TypeDiplome | null;
    anneeUniversitaireDebut: string | null;
    progression: ProgressionEtudiant;
  };
}
