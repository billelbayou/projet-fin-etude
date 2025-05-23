import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import getPersonalInfos from "@/utils/getPersonalInfos";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour créer un étudiant" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { year, academicYearId, status } = body;

    // Validate required fields
    if (!year || !academicYearId) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Get student ID from session
    const user = await getPersonalInfos(session);

    if (!user.Etudiant) {
      return NextResponse.json(
        { error: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Check if year already exists for this student
    const existingYear = await prisma.anneeNote.findFirst({
      where: {
        etudiantId: user.Etudiant.id,
        annee: year,
      },
    });

    if (existingYear) {
      return NextResponse.json(
        { error: "Cette année académique existe déjà" },
        { status: 409 }
      );
    }

    // Check if the that level is already passed
    const levelPassed = await prisma.anneeNote.findFirst({
      where: {
        etudiantId: user.Etudiant.id,
        anneeUnivId: academicYearId,
        statut: "PASSED",
      },
    });

    if (levelPassed) {
      return NextResponse.json(
        { error: "Vous avez déjà validé cette année académique" },
        { status: 409 }
      );
    }
    // Create the academic record
    const academicRecord = await prisma.anneeNote.create({
      data: {
        annee: year,
        etudiant: {
          connect: { id: user.Etudiant.id as string },
        },
        anneeUniv: {
          connect: { id: academicYearId },
        },
        statut: status, // Default status
        // Leave credits and average empty initially
        credits: null,
        moyenne: null,
      },
      include: {
        anneeUniv: true,
      },
    });

    return NextResponse.json(
      {
        message: "Année académique enregistrée avec succès",
        data: academicRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving academic year:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  try {
    // Verify the user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const body = await request.json();
    const { id } = body;
    // Get the student record associated with this user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { etudiant: true },
    });

    if (!user?.etudiant) {
      return NextResponse.json(
        { error: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Verify the transcript belongs to this student
    const transcript = await prisma.anneeNote.findUnique({
      where: { id },
      select: { etudiantId: true },
    });

    if (!transcript) {
      return NextResponse.json(
        { error: "Configuration de relevé non trouvée" },
        { status: 404 }
      );
    }

    if (transcript.etudiantId !== user.etudiant.id) {
      return NextResponse.json(
        { error: "Non autorisé à supprimer cette configuration" },
        { status: 403 }
      );
    }

    // Delete the transcript configuration
    await prisma.anneeNote.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Configuration supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transcript:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const session = await auth();
  // Verify the user is authenticated
  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour accéder aux relevés" },
      { status: 401 }
    );
  }

  try {
    if (!session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { etudiant: true },
    });

    if (!user?.etudiant) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const transcripts = await prisma.anneeNote.findMany({
      where: { etudiantId: user.etudiant.id },
      include: {
        semestreNotes: {
          include: {
            uniteNotes: {
              include: {
                moduleNotes: true,
              },
            },
          },
        },
        anneeUniv: {
          include: {
            semestres: {
              include: {
                unites: {
                  include: {
                    modules: true,
                  },
                },
              },
            },
          },
        },
        soumission: true,
      },

      orderBy: {
        annee: "asc",
      },
    });

    return NextResponse.json(transcripts);
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
