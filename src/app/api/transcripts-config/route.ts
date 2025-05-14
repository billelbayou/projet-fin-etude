import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import getPersonalInfos from "@/utils/getPersonalInfos";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getPersonalInfos(session);
  const etudiant = user?.Etudiant;

  if (!etudiant) {
    return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
  }

  const body = await req.json();

  try {
    for (const year of body) {
      const { year: academicYear, level, semesters } = year;

      // Find or create academic year
      const existingYear = await prisma.anneeUniversitaire.findFirst({
        where: {
          anneesNotes: {
            some: {
              etudiantId: etudiant.id,
              annee: academicYear,
            },
          },
        },
      });

      const anneeUniversitaire = existingYear
        ? existingYear
        : await prisma.anneeUniversitaire.create({ data: {} });

      const moyenne =
        semesters.reduce((acc, s) => acc + s.moyenne, 0) / semesters.length;
      const credits = semesters.reduce((acc, s) => acc + s.credits, 0);

      // Save or update AnneeNote
      await prisma.anneeNote.upsert({
        where: {
          etudiantId_anneeUnivId: {
            etudiantId: etudiant.id,
            anneeUnivId: anneeUniversitaire.id,
          },
        },
        update: { annee: academicYear, moyenne, credits },
        create: {
          annee: academicYear,
          moyenne,
          credits,
          etudiantId: etudiant.id,
          anneeUnivId: anneeUniversitaire.id,
        },
      });

      for (const semestreData of semesters) {
        const semestre = await prisma.semestre.create({
          data: {
            nom: semestreData.nom,
            ordre: semestreData.ordre,
            anneeId: anneeUniversitaire.id,
          },
        });

        // Save semestre note
        await prisma.semestreNote.upsert({
          where: {
            etudiantId_semestreId: {
              etudiantId: etudiant.id,
              semestreId: semestre.id,
            },
          },
          update: { note: semestreData.moyenne },
          create: {
            etudiantId: etudiant.id,
            semestreId: semestre.id,
            note: semestreData.moyenne,
          },
        });

        for (const uniteData of semestreData.unites) {
          const unite = await prisma.unite.create({
            data: {
              nom: uniteData.nom,
              semestreId: semestre.id,
            },
          });

          for (const moduleData of uniteData.modules) {
            const Module = await prisma.module.create({
              data: {
                nom: moduleData.nom,
                credits: moduleData.credits,
                coefficient: moduleData.coefficient,
                uniteId: unite.id,
              },
            });

            // Create empty ModuleNote
            await prisma.moduleNote.create({
              data: {
                etudiantId: etudiant.id,
                moduleId: Module.id,
                note: 0, // Empty note initialized to 0
              },
            });
          }
        }
      }
    }

    return NextResponse.json({ message: "Transcripts saved successfully" });
  } catch (error) {
    console.error("Transcript config error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement" },
      { status: 500 }
    );
  }
}
