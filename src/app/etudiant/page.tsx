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

  const user = await getPersonalInfos(session);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.Utilisateur.role !== "ETUDIANT") {
    redirect("/login");
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
            Bienvenue, {user.Utilisateur.prenom} {user.Utilisateur.nom}!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto ">
        {/* Combined Form Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2">
          <div className="p-6">
            <CombinedStudentForm utilisateur={user} />
          </div>
        </div>
      </main>
    </div>
  );
}
