"use server";

import { prisma } from "@/db/prisma";
import { DiplomeType } from "@prisma/client";

export async function updateInfo(previousState: unknown, formData: FormData) {
  const {
    id,
    numeroInscription,
    dateNaissance,
    lieuNaissance,
    domaine,
    filiere,
    specialite,
    diplomeType,
    anneeUniversitaireDebut,
  } = Object.fromEntries(formData);
  const studentDetails = {
    id: id as string,
    numeroInscription: numeroInscription as string,
    dateNaissance: new Date(dateNaissance as string),
    lieuNaissance: lieuNaissance as string,
    domaine: domaine as string,
    filiere: filiere as string,
    specialite: specialite as string,
    diplomeType: diplomeType as DiplomeType,
    anneeUniversitaireDebut: anneeUniversitaireDebut as string,
  };
  try {
    await prisma.etudiant.update({
      where: { id: studentDetails.id },
      data: {
        numeroInscription: studentDetails.numeroInscription,
        dateNaissance: studentDetails.dateNaissance,
        lieuNaissance: studentDetails.lieuNaissance,
        domaine: studentDetails.domaine,
        filiere: studentDetails.filiere,
        specialite: studentDetails.specialite,
        diplomeType: studentDetails.diplomeType,
        anneeUniversitaireDebut: studentDetails.anneeUniversitaireDebut,
        progression: "informationComplete",
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la mise à jour des informations",
    };
  }
}
