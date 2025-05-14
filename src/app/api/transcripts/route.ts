import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import getPersonalInfos from "@/utils/getPersonalInfos";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
    const data = await request.json();

    // Validate request body
    if (
      !data.year ||
      !data.level ||
      !data.s1_moyenne ||
      !data.s1_credits ||
      !data.s2_moyenne ||
      !data.s2_credits
    ) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const transcriptDetails = {
      year: data.year as string,
      level: data.level as "L1" | "L2" | "L3",
      s1_moyenne: parseFloat(data.s1_moyenne as string),
      s1_credits: parseInt(data.s1_credits as string),
      s2_moyenne: parseFloat(data.s2_moyenne as string),
      s2_credits: parseInt(data.s2_credits as string),
    };

    // Find the academic year template with all nested relations
    const anneeTemplate = await prisma.anneeUniversitaire.findFirst({
      where: { niveau: transcriptDetails.level },
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
    });

    if (!anneeTemplate) {
      return NextResponse.json(
        { success: false, error: "Le template pour ce niveau n'existe pas" },
        { status: 404 }
      );
    }

    // Check for existing configuration
    const existingConfig = await prisma.anneeNote.findFirst({
      where: {
        etudiantId,
        anneeUnivId: anneeTemplate.id,
        annee: transcriptDetails.year,
      },
    });

    if (existingConfig) {
      return NextResponse.json(
        {
          success: false,
          error: `Configuration existe déjà pour ${transcriptDetails.level} (${transcriptDetails.year})`,
        },
        { status: 409 }
      );
    }

    // Calculate averages
    const moyenne =
      (transcriptDetails.s1_moyenne + transcriptDetails.s2_moyenne) / 2;
    const credits =
      moyenne >= 10
        ? 60
        : transcriptDetails.s1_credits + transcriptDetails.s2_credits;

    // Create in transaction with extended timeout
    const result = await prisma.$transaction(
      async (tx) => {
        // 1. Create academic year record
        const newAnneeNote = await tx.anneeNote.create({
          data: {
            annee: transcriptDetails.year,
            moyenne,
            credits,
            etudiant: { connect: { id: etudiantId } },
            anneeUniv: { connect: { id: anneeTemplate.id } },
          },
        });

        // 2. Create semester notes
        await Promise.all(
          anneeTemplate.semestres.map((semestre, index) =>
            tx.semestreNote.create({
              data: {
                note:
                  index === 0
                    ? transcriptDetails.s1_moyenne
                    : transcriptDetails.s2_moyenne,
                etudiant: { connect: { id: etudiantId } },
                semestre: { connect: { id: semestre.id } },
                anneeNote: { connect: { id: newAnneeNote.id } },
              },
            })
          )
        );

        // Prepare all unit and module notes to create
        const uniteNotesToCreate = [];
        const moduleNotesToCreate = [];

        for (const semestre of anneeTemplate.semestres) {
          for (const unite of semestre.unites) {
            uniteNotesToCreate.push({
              note: 0,
              etudiantId,
              uniteId: unite.id,
            });

            for (const Module of unite.modules) {
              moduleNotesToCreate.push({
                note: 0,
                etudiantId,
                moduleId: Module.id,
              });
            }
          }
        }

        // 3. Create all unit notes in batch
        if (uniteNotesToCreate.length > 0) {
          await tx.uniteNote.createMany({
            data: uniteNotesToCreate,
            skipDuplicates: true,
          });
        }

        // 4. Create all module notes in batch
        if (moduleNotesToCreate.length > 0) {
          await tx.moduleNote.createMany({
            data: moduleNotesToCreate,
            skipDuplicates: true,
          });
        }

        // 5. Update student progression
        await tx.etudiant.update({
          where: { id: etudiantId },
          data: { progression: "transcriptConfigured" },
        });

        return newAnneeNote;
      },
      {
        maxWait: 20000, // Maximum time to wait for the transaction to complete
        timeout: 15000, // Maximum time the transaction can run
      }
    );

    return NextResponse.json({
      success: true,
      message: "Relevé configuré avec succès",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);

    let errorMessage = "Erreur serveur";
    if (error.code === "P2002") {
      errorMessage = "Configuration existe déjà pour ces semestres";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: error.code === "P2002" ? 409 : 500 }
    );
  }
}

export async function GET() {
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

    // Get all configured academic years with their structure
    const transcripts = await prisma.anneeNote.findMany({
      where: { etudiantId },
      include: {
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
        semestreNotes: true,
      },
      orderBy: { annee: "desc" },
    });

    // Format the response to include all placeholders
    const formattedTranscripts = await Promise.all(
      transcripts.map(async (transcript) => {
        // Get all unit notes for this academic year
        const uniteNotes = await prisma.uniteNote.findMany({
          where: {
            etudiantId,
            unite: {
              semestre: {
                anneeId: transcript.anneeUnivId,
              },
            },
          },
        });

        // Get all module notes for this academic year
        const moduleNotes = await prisma.moduleNote.findMany({
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
        });

        return {
          id: transcript.id,
          year: transcript.annee,
          level: transcript.anneeUniv.niveau,
          moyenne: transcript.moyenne,
          credits: transcript.credits,
          semestres: transcript.anneeUniv.semestres.map((semestre) => ({
            id: semestre.id,
            nom: semestre.nom,
            ordre: semestre.ordre,
            note:
              transcript.semestreNotes.find(
                (sn) => sn.semestreId === semestre.id
              )?.note || 0,
            unites: semestre.unites.map((unite) => ({
              id: unite.id,
              nom: unite.nom,
              note: uniteNotes.find((un) => un.uniteId === unite.id)?.note || 0,
              modules: unite.modules.map((module) => ({
                id: module.id,
                nom: module.nom,
                credits: module.credits,
                coefficient: module.coefficient,
                note:
                  moduleNotes.find((mn) => mn.moduleId === module.id)?.note ||
                  0,
              })),
            })),
          })),
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: formattedTranscripts,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
