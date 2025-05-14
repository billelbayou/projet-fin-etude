import { auth } from "@/auth";
import TranscriptYearForm from "@/components/etudiant-ui/TranscriptConfigForm";
import { prisma } from "@/db/prisma";
import getPersonalInfos from "@/utils/getPersonalInfos";

export default async function ConfigurationDesReleves() {
  const session = await auth();

  const user = await getPersonalInfos(session!);
  const transcriptsConfigured = await prisma.anneeNote.findMany({
    where: {
      etudiantId: user.Etudiant.id,
    },
    include: {
      anneeUniv: {
        select: {
          niveau: true,
        },
      },
    },
  });
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Configuration des Relevés
      </h1>
      <p className="text-gray-600 mb-8">
        Configurez vos relevés de notes par année académique
      </p>

      <div className="space-y-6">
        {/* Example saved year - static data */}
        <ul className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Années configurées</h2>
          {transcriptsConfigured.map((transcript) => (
            <li
              key={transcript.id}
              className="border rounded-lg p-4 bg-gray-50 mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">
                  {transcript.anneeUniv.niveau} - {transcript.annee}
                </h3>
                <p>Moyenne: {transcript.moyenne}</p>
                <p>Crédits: {transcript.credits}</p>
              </div>
              <button
                className="p-2 text-red-600 hover:text-red-800"
                aria-label="Supprimer cette année"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-4">
          Configuration d&apos;une nouvelle année académique
        </h2>
        <TranscriptYearForm />
      </div>
    </div>
  );
}
