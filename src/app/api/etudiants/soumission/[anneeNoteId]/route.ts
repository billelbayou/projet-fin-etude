// app/api/etudiants/soumission/[anneeNoteId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma"; // Adjust the import path as needed

export async function POST(
  request: Request,
  { params }: { params: Promise<{ anneeNoteId: string }> }
) {
  try {
    const { anneeNoteId } = await params;
    // Verify the AnneeNote exists and get related data
    const anneeNote = await prisma.anneeNote.findUnique({
      where: { id: anneeNoteId },
      include: {
        etudiant: {
          include: {
            departement: {
              include: {
                chef: true,
              },
            },
          },
        },
        soumission: true, // Check if submission already exists
      },
    });

    if (!anneeNote) {
      return NextResponse.json(
        { error: "Academic year note not found" },
        { status: 404 }
      );
    }
    // Check if submission already exists
    if (anneeNote.soumission) {
      return NextResponse.json(
        { error: "Submission already exists for this academic year" },
        { status: 400 }
      );
    }

    // Check if department has a chef
    if (!anneeNote.etudiant.departement.chef) {
      return NextResponse.json(
        { error: "Department chief not found. Cannot create submission." },
        { status: 400 }
      );
    }

    // Create the submission
    const soumission = await prisma.soumission.create({
      data: {
        anneeNoteId: anneeNoteId,
        etudiantId: anneeNote.etudiantId,
        chefDepartementId: anneeNote.etudiant.departement.chef.id,
        statut: "PENDING",
        dateSoumission: new Date(),
        commentaire: null,
      },
      include: {
        anneeNote: {
          include: {
            anneeUniv: true,
          },
        },
        etudiant: {
          include: {
            user: true,
          },
        },
        chefDepartement: {
          select: {
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Submission created successfully",
      data: soumission,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Failed to create submission", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { anneeNoteId: string } }
) {
  try {
    const { anneeNoteId } = params;

    // Get the submission for this academic year note
    const soumission = await prisma.soumission.findUnique({
      where: { anneeNoteId: anneeNoteId },
      include: {
        anneeNote: {
          include: {
            anneeUniv: true,
            etudiant: {
              include: {
                user: true,
              },
            },
          },
        },
        etudiant: {
          include: {
            user: true,
          },
        },
        chefDepartement: {
          select: {
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
    });

    if (!soumission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: soumission,
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { anneeNoteId: string } }
) {
  try {
    const { anneeNoteId } = params;
    const body = await request.json();
    const { statut, commentaire, dateValidation } = body;

    // Verify the submission exists
    const existingSoumission = await prisma.soumission.findUnique({
      where: { anneeNoteId: anneeNoteId },
      include: {
        etudiant: true,
      },
    });

    if (!existingSoumission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Update the submission
    const updatedSoumission = await prisma.$transaction(async (tx) => {
      // Update submission
      const soumission = await tx.soumission.update({
        where: { anneeNoteId: anneeNoteId },
        data: {
          statut: statut || existingSoumission.statut,
          commentaire:
            commentaire !== undefined
              ? commentaire
              : existingSoumission.commentaire,
          dateValidation: dateValidation
            ? new Date(dateValidation)
            : statut === "APPROVED" || statut === "REJECTED"
            ? new Date()
            : existingSoumission.dateValidation,
          updatedAt: new Date(),
        },
      });

      // Update student progression based on submission status
      let newProgression = existingSoumission.etudiant.progression;
      if (statut === "APPROVED") {
        newProgression = "valide";
      } else if (statut === "REJECTED") {
        newProgression = "rejete";
      } else if (statut === "REVISED") {
        newProgression = "transcriptFilled"; // Student can revise
      }

      await tx.etudiant.update({
        where: { id: existingSoumission.etudiantId },
        data: {
          progression: newProgression,
        },
      });

      return soumission;
    });

    return NextResponse.json({
      success: true,
      message: "Submission updated successfully",
      data: updatedSoumission,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { anneeNoteId: string } }
) {
  try {
    const { anneeNoteId } = params;

    // Verify the submission exists
    const existingSoumission = await prisma.soumission.findUnique({
      where: { anneeNoteId: anneeNoteId },
      include: {
        etudiant: true,
      },
    });

    if (!existingSoumission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Only allow deletion if submission is PENDING or REVISED
    if (!["PENDING", "REVISED"].includes(existingSoumission.statut)) {
      return NextResponse.json(
        { error: "Cannot delete submission with current status" },
        { status: 400 }
      );
    }

    // Delete the submission and update student progression
    await prisma.$transaction(async (tx) => {
      await tx.soumission.delete({
        where: { anneeNoteId: anneeNoteId },
      });

      await tx.etudiant.update({
        where: { id: existingSoumission.etudiantId },
        data: {
          progression: "transcriptFilled",
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Failed to delete submission", details: error.message },
      { status: 500 }
    );
  }
}
