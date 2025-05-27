import { AnneeNote, Semestre } from "@/types";

export function getTotalCredits(anneeNote: AnneeNote) {
  if (!anneeNote.anneeUniv?.semestres) return 0;

  return anneeNote.anneeUniv.semestres.reduce(
    (total: number, semestre: Semestre) => total + (semestre.credits || 0),
    0
  );
}
