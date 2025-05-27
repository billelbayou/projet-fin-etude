import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const anneeNote = await prisma.anneeNote.findUnique({
      where: { id },
      include: {
        etudiant: {
          include: {
            user: true,
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
              orderBy: { ordre: "asc" },
            },
          },
        },
        semestreNotes: {
          include: {
            semestre: true, // Include semester details
            uniteNotes: {
              include: {
                unite: true, // Include unit details
                moduleNotes: {
                  include: {
                    module: true, // Include module details
                  },
                },
              },
            },
          },
          orderBy: {
            semestre: {
              ordre: "asc",
            },
          },
        },
      },
    });

    if (!anneeNote) {
      return NextResponse.json(
        { error: "Academic year note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: anneeNote,
    });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return NextResponse.json(
      { error: "Failed to fetch transcript" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { moduleNotes, uniteNotes, semestreNotes, anneeNote } =
      await request.json();

    const anneeCredits = anneeNote >= 10 ? 60 : anneeNote.credits;
    // Verify the AnneeNote exists
    const existingAnneeNote = await prisma.anneeNote.findUnique({
      where: { id },
      include: {
        etudiant: true,
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
      },
    });

    if (!existingAnneeNote) {
      return NextResponse.json(
        { error: "Academic year note not found" },
        { status: 404 }
      );
    }

    // Start transaction
    await prisma.$transaction(async (tx) => {
      // First update the year note
      await tx.anneeNote.update({
        where: { id },
        data: {
          moyenne: anneeNote.moyenne,
          credits: anneeCredits,
          statut: anneeNote.statut,
          updatedAt: new Date(),
        },
      });

      // Update semester notes (these need to be created/updated first as they're referenced by unite notes)
      const createdSemestreNotes = new Map();

      for (const note of semestreNotes) {
        const semestreNote = await tx.semestreNote.upsert({
          where: {
            etudiantId_semestreId_anneeNoteId: {
              etudiantId: existingAnneeNote.etudiantId,
              semestreId: note.semestreId,
              anneeNoteId: id,
            },
          },
          update: {
            note: note.note,
            credits: note.credits,
            updatedAt: new Date(),
          },
          create: {
            etudiantId: existingAnneeNote.etudiantId,
            semestreId: note.semestreId,
            anneeNoteId: id,
            note: note.note,
            credits: note.credits,
          },
        });
        createdSemestreNotes.set(note.semestreId, semestreNote.id);
      }

      // Update unit notes (link them to their corresponding semester notes)
      const createdUniteNotes = new Map();

      for (const note of uniteNotes) {
        // Find which semester this unit belongs to
        const unite = await tx.unite.findUnique({
          where: { id: note.uniteId },
          select: { semestreId: true },
        });

        if (!unite) {
          throw new Error(`Unite with id ${note.uniteId} not found`);
        }

        const semestreNoteId = createdSemestreNotes.get(unite.semestreId);
        if (!semestreNoteId) {
          throw new Error(
            `SemestreNote not found for semestre ${unite.semestreId}`
          );
        }

        const uniteNote = await tx.uniteNote.upsert({
          where: {
            etudiantId_uniteId: {
              etudiantId: existingAnneeNote.etudiantId,
              uniteId: note.uniteId,
            },
          },
          update: {
            note: note.note,
            credits: note.credits,
            semestreNoteId: semestreNoteId,
            updatedAt: new Date(),
          },
          create: {
            etudiantId: existingAnneeNote.etudiantId,
            uniteId: note.uniteId,
            note: note.note,
            credits: note.credits,
            semestreNoteId: semestreNoteId,
          },
        });
        createdUniteNotes.set(note.uniteId, uniteNote.id);
      }

      // Update module notes (link them to their corresponding unit notes)
      for (const note of moduleNotes) {
        // Find which unit this module belongs to
        const Module = await tx.module.findUnique({
          where: { id: note.moduleId },
          select: { uniteId: true },
        });

        if (!Module) {
          throw new Error(`Module with id ${note.moduleId} not found`);
        }

        const uniteNoteId = createdUniteNotes.get(Module.uniteId);
        if (!uniteNoteId) {
          throw new Error(`UniteNote not found for unite ${Module.uniteId}`);
        }

        await tx.moduleNote.upsert({
          where: {
            etudiantId_moduleId: {
              etudiantId: existingAnneeNote.etudiantId,
              moduleId: note.moduleId,
            },
          },
          update: {
            note: note.note,
            credits: note.credits,
            uniteNoteId: uniteNoteId,
            updatedAt: new Date(),
          },
          create: {
            etudiantId: existingAnneeNote.etudiantId,
            moduleId: note.moduleId,
            note: note.note,
            credits: note.credits,
            uniteNoteId: uniteNoteId,
          },
        });
      }

      // Update student progression
      await tx.etudiant.update({
        where: { id: existingAnneeNote.etudiantId },
        data: {
          progression: "transcriptFilled",
        },
      });

      return { success: true };
    });

    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating transcript:", error);
    return NextResponse.json(
      { error: "Failed to update transcript", details: error.message },
      { status: 500 }
    );
  }
}
