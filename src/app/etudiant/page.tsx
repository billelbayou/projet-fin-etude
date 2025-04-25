import { auth, signOut } from "@/auth";
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
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="w-full md:w-auto"
        >
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 font-medium"
          >
            Se déconnecter
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Informations Personnelles
            </h2>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={
                    etudiant.Utilisateur.prenom + " " + etudiant.Utilisateur.nom
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={etudiant.Utilisateur.email || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="numeroInscription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Numéro d&apos;inscription
                </label>
                <input
                  type="text"
                  id="numeroInscription"
                  defaultValue={etudiant.etudiant.numeroInscription}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="dateNaissance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="dateNaissance"
                  defaultValue={
                    etudiant.etudiant.dateNaissance?.toISOString() || ""
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="lieuNaissance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lieu de naissance
                </label>
                <input
                  type="text"
                  id="lieuNaissance"
                  defaultValue={etudiant.etudiant.lieuNaissance || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>

        {/* Academic Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Informations Académiques
            </h2>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="domaine"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Domaine
                </label>
                <input
                  type="text"
                  id="domaine"
                  defaultValue={etudiant.etudiant.domaine || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="filiere"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filière
                </label>
                <input
                  type="text"
                  id="filiere"
                  defaultValue={etudiant.etudiant.filiere || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="specialite"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Spécialité
                </label>
                <input
                  type="text"
                  id="specialite"
                  defaultValue={etudiant.etudiant.specialite || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="diplomeType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type de diplôme
                </label>
                <select
                  id="diplomeType"
                  defaultValue={etudiant.etudiant.diplomeType || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="licence">Licence</option>
                  <option value="master">Master</option>
                  <option value="doctorat">Doctorat</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="anneeUniversitaireDebut"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Année universitaire de début
                </label>
                <input
                  type="text"
                  id="anneeUniversitaireDebut"
                  defaultValue={etudiant.etudiant.anneeUniversitaireDebut || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>

        {/* Progress Card */}
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
                  {etudiant.etudiant.progression}
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
