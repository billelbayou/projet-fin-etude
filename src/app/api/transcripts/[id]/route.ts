import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import getPersonalInfos from "@/utils/getPersonalInfos";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete related records first to maintain referential integrity
    await prisma.$transaction([
      prisma.moduleNote.deleteMany({
        where: {
          etudiant: {
            notesAnnees: {
              some: {
                id: params.id,
              },
            },
          },
        },
      }),
      prisma.uniteNote.deleteMany({
        where: {
          etudiant: {
            notesAnnees: {
              some: {
                id: params.id,
              },
            },
          },
        },
      }),
      prisma.semestreNote.deleteMany({
        where: {
          etudiant: {
            notesAnnees: {
              some: {
                id: params.id,
              },
            },
          },
        },
      }),
      prisma.anneeNote.delete({
        where: {
          id: params.id,
        },
      }),
    ]);

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete transcript" },
      { status: 500 }
    );
  }
}

// app/api/transcripts/[id]/route.ts (PUT handler)

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Session non valide" },
      { status: 401 }
    );
  }

  try {
    const user = await getPersonalInfos(session);
    const etudiantId = user.Etudiant.id;
    const anneeNoteId = params.id;
    const data = await request.json();

    // Validate request body
    if (!data.semestres || !Array.isArray(data.semestres)) {
      return NextResponse.json(
        { success: false, error: "Données invalides" },
        { status: 400 }
      );
    }

    // Verify the transcript belongs to the student
    const transcript = await prisma.anneeNote.findUnique({
      where: { id: anneeNoteId, etudiantId },
      include: { anneeUniv: { include: { semestres: true } } },
    });

    if (!transcript) {
      return NextResponse.json(
        { success: false, error: "Relevé non trouvé" },
        { status: 404 }
      );
    }

    // Update in transaction
    const result = await prisma.$transaction(
      async (tx) => {
        // Update semester notes
        await Promise.all(
          data.semestres.map(async (semestre) => {
            await tx.semestreNote.updateMany({
              where: {
                etudiantId,
                semestreId: semestre.id,
                anneeNoteId,
              },
              data: { note: semestre.note },
            });

            // Update unit notes
            await Promise.all(
              semestre.unites.map(async (unite) => {
                await tx.uniteNote.updateMany({
                  where: {
                    etudiantId,
                    uniteId: unite.id,
                  },
                  data: { note: unite.note },
                });

                // Update module notes
                await Promise.all(
                  unite.modules.map(async (Module) => {
                    await tx.moduleNote.updateMany({
                      where: {
                        etudiantId,
                        moduleId: Module.id,
                      },
                      data: { note: Module.note },
                    });
                  })
                );
              })
            );
          })
        );

        // Calculate new averages and credits
        const semestreNotes = await tx.semestreNote.findMany({
          where: { anneeNoteId },
        });

        const moyenne =
          semestreNotes.reduce((sum, sn) => sum + sn.note, 0) /
          semestreNotes.length;

        const moduleNotes = await tx.moduleNote.findMany({
          where: {
            etudiantId,
            module: {
              unite: {
                semestre: {
                  anneeId: transcript.anneeUnivId,
                },
              },
            },
          },
          include: {
            module: {
              select: {
                credits: true,
              },
            },
          },
        });

        const credits = moduleNotes.reduce((sum, mn) => {
          return mn.note >= 10 ? sum + mn.module.credits : sum;
        }, 0);

        // Update academic year summary
        const updatedAnneeNote = await tx.anneeNote.update({
          where: { id: anneeNoteId },
          data: { moyenne, credits },
        });

        // Update student progression if needed
        if (user.Etudiant.progression !== "transcriptFilled") {
          await tx.etudiant.update({
            where: { id: etudiantId },
            data: { progression: "transcriptFilled" },
          });
        }

        return updatedAnneeNote;
      },
      {
        maxWait: 20000,
        timeout: 15000,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Relevé mis à jour avec succès",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
