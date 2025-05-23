import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma"; // Adjust the import path as needed

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { decision, comment } = await request.json();

    const submission = await prisma.soumission.update({
      where: { id },
      data: {
        statut: decision,
        commentaire: comment,
        dateValidation: new Date(),
      },
      include: {
        anneeNote: true,
      },
    });

    // Update student progression if approved
    if (decision === "APPROVED") {
      await prisma.etudiant.update({
        where: { id: submission.etudiantId },
        data: {
          progression: "valide",
        },
      });
    } else if (decision === "REJECTED") {
      await prisma.etudiant.update({
        where: { id: submission.etudiantId },
        data: {
          progression: "rejete",
        },
      });
    }

    return NextResponse.json(submission);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process review" },
      { status: 500 }
    );
  }
}
