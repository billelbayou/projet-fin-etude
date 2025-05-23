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

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const Etudiant = await prisma.etudiant.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!Etudiant) {
    return {
      Utilisateur: user,
    };
  }
  const etudiantUtilisateur = {
    Utilisateur: user,
    Etudiant,
  };
  return etudiantUtilisateur;
}
