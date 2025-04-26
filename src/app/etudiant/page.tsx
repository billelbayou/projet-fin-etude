// app/dashboard/page.tsx
import { auth } from "@/auth";
import CombinedStudentForm from "@/components/etudiant-ui/personalInfoForm";
import getPersonalInfos from "@/utils/getPersonalInfos";
import { redirect } from "next/navigation";

export default async function EtudiantDashboard() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const etudiant = await getPersonalInfos(session);

  if (!etudiant) {
    throw new Error("Etudiant not found");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Tableau de Bord Étudiant
          </h1>
          <p className="text-gray-600">
            Bienvenue, {etudiant.Utilisateur.prenom} {etudiant.Utilisateur.nom}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Combined Form Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2">
          <div className="p-6">
            <CombinedStudentForm EtudiantUtilisateur={etudiant} />
          </div>
        </div>

        {/* Progress Card (kept the same) */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Progression</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                État actuel
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="font-medium text-blue-800 capitalize">
                  {etudiant.Etudiant.progression}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Prochaine étape
              </h3>
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <p className="font-medium text-green-800">
                  Inscription administrative
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Progression globale
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">25% complété</p>
            </div>

            <div className="pt-4">
              <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-700 font-medium">
                Voir le détail
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
