import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import getPersonalInfos from "@/utils/getPersonalInfos";

export default async function addTranscriptConfig(
  previousState: unknown,
  formData: FormData
) {
  // Extract and parse form data
  const { year, level, s1_moyenne, s1_credits, s2_moyenne, s2_credits } =
    Object.fromEntries(formData);

  const transcriptDetails = {
    year: year as string,
    level: level as "L1" | "L2" | "L3",
    s1_moyenne: parseFloat(s1_moyenne as string),
    s1_credits: parseInt(s1_credits as string),
    s2_moyenne: parseFloat(s2_moyenne as string),
    s2_credits: parseInt(s2_credits as string),
  };

  const session = await auth();
  try {
    // Get user session and student ID
    if (!session) {
      return {
        success: false,
        error: "Session non valide",
      };
    }
    const user = await getPersonalInfos(session);
    const etudiantId = user.Etudiant.id; // REPLACE THIS

    // 1. Check if this year already exists for this student
    const existingYear = await prisma.anneeNote.findFirst({
      where: {
        annee: transcriptDetails.year,
        etudiantId: etudiantId,
      },
    });

    if (existingYear) {
      return {
        success: false,
        error: "Vous avez déjà configuré cette année académique",
      };
    }

    // 2. Find the corresponding AnneeUniversitaire template
    const anneeTemplate = await prisma.anneeUniversitaire.findFirst({
      where: {
        niveau: transcriptDetails.level,
      },
      include: {
        semestres: true,
      },
    });

    if (!anneeTemplate) {
      return {
        success: false,
        error: "Le template pour ce niveau n'existe pas",
      };
    }

    // 3. Calculate yearly average and total credits
    const moyenne =
      (transcriptDetails.s1_moyenne + transcriptDetails.s2_moyenne) / 2;
    const credits =
      moyenne >= 10
        ? 60
        : transcriptDetails.s1_credits + transcriptDetails.s2_credits;

    // 4. Create the AnneeNote (student's year record)
    const newAnneeNote = await prisma.anneeNote.create({
      data: {
        annee: transcriptDetails.year,
        moyenne,
        credits,
        etudiant: { connect: { id: etudiantId } },
        anneeUniv: { connect: { id: anneeTemplate.id } },
      },
    });

    // 5. Create semester notes for each semester
    // Assuming first semester is at index 0, second at index 1
    await prisma.semestreNote.createMany({
      data: [
        {
          note: transcriptDetails.s1_moyenne,
          etudiantId,
          semestreId: anneeTemplate.semestres[0].id,
        },
        {
          note: transcriptDetails.s2_moyenne,
          etudiantId,
          semestreId: anneeTemplate.semestres[1].id,
        },
      ],
    });

    // 6. Update student progression
    await prisma.etudiant.update({
      where: { id: etudiantId },
      data: { progression: "transcriptConfigured" },
    });

    return {
      success: true,
      message: "Relevé de notes configuré avec succès",
      data: newAnneeNote,
    };
  } catch (error) {
    console.error("Error creating transcript config:", error);
    return {
      success: false,
      error: "Erreur lors de la configuration du relevé",
    };
  }
}
