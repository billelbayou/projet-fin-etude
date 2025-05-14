// types/index.d.ts
export interface ModuleNote {
  id: string;
  note: number;
}

export interface Module {
  id: string;
  nom: string;
  credits: number;
  coefficient: number;
  ModuleNote: ModuleNote[];
}

export interface UniteNote {
  id: string;
  note: number;
}

export interface Unite {
  id: string;
  nom: string;
  modules: Module[];
  UniteNote: UniteNote[];
}

export interface SemestreNote {
  id: string;
  note: number;
}

export interface Semestre {
  id: string;
  nom: string;
  ordre: number;
  unites: Unite[];
  SemestreNote: SemestreNote[];
}

export interface AnneeUniversitaire {
  id: string;
  semestres: Semestre[];
}

export interface AnneeNote {
  id: string;
  annee: string;
  moyenne: number | null;
  credits: number | null;
  mention: string | null;
  anneeUniv: AnneeUniversitaire;
}
