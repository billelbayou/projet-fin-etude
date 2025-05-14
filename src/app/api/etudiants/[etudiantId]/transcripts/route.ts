import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { etudiantId: string } }
) {
  try {
    const transcripts = await prisma.anneeNote.findMany({
      where: {
        etudiantId: params.etudiantId,
      },
      include: {
        anneeUniv: {
          select: {
            niveau: true,
          },
        },
      },
      orderBy: {
        annee: "desc",
      },
    });

    return NextResponse.json(transcripts);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transcripts" },
      { status: 500 }
    );
  }
}
