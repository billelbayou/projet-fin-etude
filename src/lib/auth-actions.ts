"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function createEtudiant(
  previousState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const motDePasse = formData.get("motDePasse") as string;
  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const matricule = formData.get("matricule") as string;

  try {
    const session = await auth();
    if (!session) {
      throw new Error("Vous devez être connecté pour créer un étudiant");
    }
    if (!session.user?.email) {
      throw new Error("Email de l'utilisateur introuvable");
    }

    const chef = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        managedDepartment: {
          select: {
            id: true,
          },
        },
      },
    });

    const departementId = chef?.managedDepartment?.id;

    // Validate required fields
    const requiredFields = {
      email,
      motDePasse,
      nom,
      prenom,
      matricule,
      departementId: chef?.managedDepartment?.id,
    };
    if (Object.values(requiredFields).some((field) => !field)) {
      throw new Error("Tous les champs obligatoires doivent être remplis");
    }

    // Check for existing records in parallel
    const [existingUser, existingMatricule, departmentExists] =
      await Promise.all([
        prisma.user.findUnique({ where: { email } }),
        prisma.etudiant.findUnique({ where: { matricule } }),
        prisma.departement.findUnique({ where: { id: departementId } }),
      ]);

    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà");
    }

    if (existingMatricule) {
      throw new Error("Un étudiant avec ce matricule existe déjà");
    }

    if (!departmentExists) {
      throw new Error("Département introuvable");
    }

    const hashedPassword = await hash(motDePasse, 10);

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          motDePasse: hashedPassword,
          nom,
          prenom,
          role: "ETUDIANT",
          dateCreation: new Date(), // Explicitly set creation date
          dateModification: new Date(), // Explicitly set modification date
        },
      });

      return await prisma.etudiant.create({
        data: {
          userId: user.id,
          departementId: departementId as string,
          matricule,
          progression: "initial",
          // Optionally set default values for other required fields if any
        },
        include: {
          user: true,
          departement: true, // Include department in response
        },
      });
    });

    return {
      success: true,
      message: "Étudiant créé avec succès",
      etudiant: result,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: "Une erreur inconnue est survenue",
      };
    }
  }
}

export async function handleStudentSignIn(
  previousState: unknown,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
  }
  redirect("/etudiant");
}
export async function handleAdminSignIn(
  previousState: unknown,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
  }
  redirect("/admin");
}
export async function handleChefDepartementSignIn(
  previousState: unknown,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
  }
  redirect("/chef-departement");
}

export async function seDeconnecter(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  previousState: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: FormData
) {
  await signOut({ redirectTo: "/login" });
}
