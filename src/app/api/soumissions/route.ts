import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma"; // Adjust the import path as needed

export async function GET() {
  try {
    const submissions = await prisma.soumission.findMany({
      where: {
        statut: "PENDING", // Only show pending submissions
      },
      include: {
        anneeNote: {
          include: {
            anneeUniv: {
              include: {
                semestres: true,
              },
            },
          },
        },
        etudiant: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        dateSoumission: "asc",
      },
    });

    return NextResponse.json(submissions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch submissions", details: error.message},
      { status: 500 }
    );
  }
}
