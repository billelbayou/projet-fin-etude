import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export default async function getPersonalInfos(session: Session) {
  if (!session) {
    throw new Error("Session not found");
  }

  if (!session.user?.email) {
    throw new Error("User email not found");
  }

  const Utilisateur = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!Utilisateur) {
    throw new Error("User not found");
  }

  const etudiant = await prisma.etudiant.findUnique({
    where: {
      id: Utilisateur.id,
    },
  });

  if (!etudiant) {
    throw new Error("Etudiant not found");
  }

  return {
    etudiant,
    Utilisateur,
  };
}
