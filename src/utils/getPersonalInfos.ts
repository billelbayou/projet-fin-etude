import { prisma } from "@/db/prisma";
import { EtudiantUtilisateur } from "@/lib/types";
import { Session } from "next-auth";

export default async function getPersonalInfos(
  session: Session
): Promise<EtudiantUtilisateur> {
  if (!session) {
    throw new Error("Session not found");
  }

  if (!session.user?.email) {
    throw new Error("User email not found");
  }

  const Utilisateur = await prisma.utilisateur.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!Utilisateur) {
    throw new Error("User not found");
  }

  const Etudiant = await prisma.etudiant.findUnique({
    where: {
      id: Utilisateur.id,
    },
  });

  if (!Etudiant) {
    throw new Error("Etudiant not found");
  }
  const etudiantUtilisateur: EtudiantUtilisateur = {
    Utilisateur,
    Etudiant,
  };
  return etudiantUtilisateur;
}
