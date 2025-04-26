"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function inscrireUtilisateur(
  previousState: unknown,
  formData: FormData
) {
  try {
    const role = formData.get("role") as "etudiant" | "admin";
    const numeroInscription = formData.get("numeroInscription") as string;
    const nomComplet = formData.get("nomComplet") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!nomComplet || !email || !password || !confirmPassword) {
      return { error: "Tous les champs sont obligatoires" };
    }

    if (password !== confirmPassword) {
      return { error: "Les mots de passe ne correspondent pas" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Cet email est déjà utilisé" };
    }

    // Check if numeroInscription already exists
    const existingEtudiant = await prisma.etudiant.findUnique({
      where: { numeroInscription },
    });

    if (existingEtudiant) { 
      return { error: "Cet numéro d'inscription est déjà utilisé" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Split full name into nom and prenom
    const [prenom, ...nomParts] = nomComplet.split(" ");
    const nom = nomParts.join(" ");

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role === "admin" ? "admin" : "etudiant",
        nom,
        prenom,
        dateCreation: new Date(),
        dateModification: new Date(),
      },
    });

    // If student, create etudiant record with minimal required information
    if (role === "etudiant") {
      await prisma.etudiant.create({
        data: {
          id: user.id,
          numeroInscription: numeroInscription,
          progression: "initial",
          dateNaissance: new Date(),
          lieuNaissance: "",
          domaine: "",
          filiere: "",
          specialite: "",
          diplomeType: "licence",
          anneeUniversitaireDebut: "",
        },
      });
    }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'inscription",
    };
  }
  redirect("/login");
}

export async function seConnecter(previousState: unknown, formData: FormData) {
  try {
    await signIn("credentials", formData);
    return { success: true, message: "Connexion réussie" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
  }
  redirect("/etudiant");
}

export async function seDeconnecter(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  previousState: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: FormData
) {
  await signOut({ redirectTo: "/login" });
}
