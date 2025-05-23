import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, motDePasse, nom, prenom, matricule } = body;

    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour créer un étudiant" },
        { status: 401 }
      );
    }
    if (!session.user?.email) {
      return NextResponse.json(
        { error: "Email de l'utilisateur introuvable" },
        { status: 401 }
      );
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
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Check for existing records in parallel
    const [existingUser, existingMatricule, departmentExists] =
      await Promise.all([
        prisma.user.findUnique({ where: { email } }),
        prisma.etudiant.findUnique({ where: { matricule } }),
        prisma.departement.findUnique({ where: { id: departementId } }),
      ]);

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 409 }
      );
    }

    if (existingMatricule) {
      return NextResponse.json(
        { error: "Un étudiant avec ce matricule existe déjà" },
        { status: 409 }
      );
    }

    if (!departmentExists) {
      return NextResponse.json(
        { error: "Département introuvable" },
        { status: 404 }
      );
    }

    const hashedPassword = await hash(motDePasse, 12);

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

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
