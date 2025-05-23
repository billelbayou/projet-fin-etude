export enum Statut {
  PASSED = "PASSED",
  PASSED_WITH_DEBT = "PASSED_WITH_DEBT",
  FAILED = "FAILED",
}

export enum SoumissionStatut {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REVISED = "REVISED",
}

export enum Role {
  ADMIN = "ADMIN",
  CHEF_DEPARTEMENT = "CHEF_DEPARTEMENT",
  ETUDIANT = "ETUDIANT",
  ENSEIGNANT = "ENSEIGNANT",
}

export enum TypeDiplome {
  licence = "licence",
  master = "master",
  doctorat = "doctorat",
}

export enum ProgressionEtudiant {
  initial = "initial",
  informationComplete = "informationComplete",
  transcriptConfigured = "transcriptConfigured",
  transcriptFilled = "transcriptFilled",
  soumis = "soumis",
  valide = "valide",
  rejete = "rejete",
}

export enum EnmumNiveau {
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  M1 = "M1",
  M2 = "M2",
}

// Main Types
export type User = {
  id: string;
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  role: Role;
  managedDepartment?: Departement | null;
  etudiant?: Etudiant | null;
  soumissions: Soumission[];
  dateCreation: Date;
  dateModification: Date;
};

export type Departement = {
  id: string;
  name: string;
  chef?: User | null;
  chefId?: string | null;
  etudiants: Etudiant[];
  anneesUniversitaires: AnneeUniversitaire[];
  createdAt: Date;
  updatedAt: Date;
};

export type Etudiant = {
  id: string;
  user: User;
  userId: string;
  departement: Departement;
  departementId: string;
  matricule: string;
  dateNaissance?: Date | null;
  lieuNaissance?: string | null;
  domaine?: string | null;
  filiere?: string | null;
  specialite?: string | null;
  anneeUniversitaireDebut?: string | null;
  typeDiplome?: TypeDiplome | null;
  progression: ProgressionEtudiant;
  notesModules: ModuleNote[];
  notesUnites: UniteNote[];
  notesSemestres: SemestreNote[];
  notesAnnees: AnneeNote[];
  soumissions: Soumission[];
  createdAt: Date;
  updatedAt: Date;
};

export type AnneeUniversitaire = {
  id: string;
  nom: string;
  niveau: EnmumNiveau;
  domaine?: string | null;
  filiere?: string | null;
  specialite?: string | null;
  departement: Departement;
  departementId: string;
  semestres: Semestre[];
  anneesNotes: AnneeNote[];
  createdAt: Date;
  updatedAt: Date;
};

export type Semestre = {
  id: string;
  nom: string;
  ordre: number;
  credits: number;
  coefficient: number;
  annee: AnneeUniversitaire;
  anneeId: string;
  unites: Unite[];
  notes: SemestreNote[];
  createdAt: Date;
  updatedAt: Date;
};

export type Unite = {
  id: string;
  nom: string;
  credits: number;
  coefficient: number;
  semestre: Semestre;
  semestreId: string;
  modules: Module[];
  notes: UniteNote[];
  createdAt: Date;
  updatedAt: Date;
};

export type Module = {
  id: string;
  nom: string;
  credits: number;
  coefficient: number;
  unite: Unite;
  uniteId: string;
  notes: ModuleNote[];
  createdAt: Date;
  updatedAt: Date;
};

export type ModuleNote = {
  id: string;
  etudiant: Etudiant;
  etudiantId: string;
  module: Module;
  moduleId: string;
  note: number;
  credits: number;
  uniteNote?: UniteNote | null;
  uniteNoteId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UniteNote = {
  id: string;
  etudiant: Etudiant;
  etudiantId: string;
  unite: Unite;
  uniteId: string;
  note: number;
  credits: number;
  semestreNote?: SemestreNote | null;
  semestreNoteId?: string | null;
  moduleNotes: ModuleNote[];
  createdAt: Date;
  updatedAt: Date;
};

export type SemestreNote = {
  id: string;
  etudiant: Etudiant;
  etudiantId: string;
  semestre: Semestre;
  semestreId: string;
  note: number;
  credits: number;
  anneeNote: AnneeNote;
  anneeNoteId: string;
  uniteNotes: UniteNote[];
  createdAt: Date;
  updatedAt: Date;
};

export type AnneeNote = {
  id: string;
  annee: string;
  etudiant: Etudiant;
  etudiantId: string;
  anneeUniv: AnneeUniversitaire;
  anneeUnivId: string;
  statut: Statut;
  moyenne?: number | null;
  credits?: number | null;
  semestreNotes: SemestreNote[];
  soumission?: Soumission | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Soumission = {
  id: string;
  anneeNote: AnneeNote;
  anneeNoteId: string;
  etudiant: Etudiant;
  etudiantId: string;
  chefDepartement: User;
  chefDepartementId: string;
  statut: SoumissionStatut;
  dateSoumission: Date;
  dateValidation?: Date | null;
  commentaire?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
