import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Verify the student exists first
    const etudiant = await prisma.etudiant.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!etudiant) {
      return NextResponse.json(
        { error: "Étudiant non trouvé" },
        { status: 404 }
      );
    }

    // Delete in transaction to ensure data consistency
    await prisma.$transaction([
      prisma.etudiant.delete({
        where: { id },
      }),
      prisma.user.delete({
        where: { id: etudiant.user.id },
      }),
    ]);

    return NextResponse.json(
      { success: true, message: "Étudiant supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la suppression",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
