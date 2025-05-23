"use server";

import { prisma } from "@/db/prisma";
import { TypeDiplome } from "@prisma/client";
import { redirect } from "next/navigation";

export async function updateInfo(previousState: unknown, formData: FormData) {
  const {
    id,
    dateNaissance,
    lieuNaissance,
    domaine,
    filiere,
    specialite,
    typeDiplome,
    anneeUniversitaireDebut,
  } = Object.fromEntries(formData);
  const studentDetails = {
    id: id as string,
    dateNaissance: new Date(dateNaissance as string),
    lieuNaissance: lieuNaissance as string,
    domaine: domaine as string,
    filiere: filiere as string,
    specialite: specialite as string,
    typeDiplome: typeDiplome as TypeDiplome,
    anneeUniversitaireDebut: anneeUniversitaireDebut as string,
  };
  try {
    await prisma.etudiant.update({
      where: { id: studentDetails.id },
      data: {
        dateNaissance: studentDetails.dateNaissance,
        lieuNaissance: studentDetails.lieuNaissance,
        domaine: studentDetails.domaine,
        filiere: studentDetails.filiere,
        specialite: studentDetails.specialite,
        typeDiplome: studentDetails.typeDiplome,
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
  redirect("/etudiant/configuration-releves");
}
