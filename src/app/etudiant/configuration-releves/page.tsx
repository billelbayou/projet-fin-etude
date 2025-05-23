import { auth } from "@/auth";
import DeleteAcademicYear from "@/components/etudiant-ui/deleteAcademicYear";
import TranscriptYearForm from "@/components/etudiant-ui/TranscriptConfigForm";
import { prisma } from "@/db/prisma";
import getPersonalInfos from "@/utils/getPersonalInfos";

export default async function ConfigurationDesReleves() {
  const session = await auth();
  const user = await getPersonalInfos(session!);

  const academicYears = await prisma.anneeNote.findMany({
    where: {
      etudiantId: user.Etudiant?.id,
    },
    include: {
      anneeUniv: true,
    },
    orderBy: {
      annee: "asc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Configuration des Relevés
      </h1>
      <p className="text-gray-600 mb-8">
        Sélectionnez les canevas pour chaque année académique
      </p>

      <div className="space-y-6">
        {/* Configured Years */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Années configurées</h2>
          {academicYears.length > 0 ? (
            <ul className="space-y-4">
              {academicYears.map((year) => (
                <li
                  key={year.id}
                  className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold">
                      {year.anneeUniv.nom} - {year.anneeUniv.niveau}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Canevas: {year.anneeUniv.domaine} {year.anneeUniv.filiere}{" "}
                      {year.anneeUniv.specialite}
                    </p>
                  </div>
                  <DeleteAcademicYear id={year.id}/>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune année académique configurée</p>
          )}
        </div>

        {/* Add New Year Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Ajouter une année académique
          </h2>
          <TranscriptYearForm
            startingYear={user.Etudiant?.anneeUniversitaireDebut || ""}
            departmentId={user.Etudiant?.departementId || ""}
          />
        </div>
      </div>
    </div>
  );
}
