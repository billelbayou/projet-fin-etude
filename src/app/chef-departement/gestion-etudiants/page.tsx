import { auth } from "@/auth";
import { SupprimerEtudiantButton } from "@/components/admin-ui/supprimer-etudiant";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EtudiantsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const chefDepartement = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      managedDepartment: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!chefDepartement) return <div>Chef de département introuvable</div>;
  if (!chefDepartement.managedDepartment)
    return <div>Vous n&apos;êtes pas assigné à un département</div>;

  const etudiants = await prisma.etudiant.findMany({
    where: {
      departementId: chefDepartement.managedDepartment.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      user: {
        nom: "asc",
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Liste des Étudiants</h1>
        <Link
          href="/chef-departement/gestion-etudiants/ajouter-etudiant"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Ajouter un étudiant
        </Link>
      </div>

      {etudiants.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">
            Aucun étudiant trouvé dans votre département.
          </p>
          <Link
            href="/chef-departement/gestion-etudiants/ajouter-etudiant"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Ajouter votre premier étudiant
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matricule
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {etudiants.map((etudiant) => (
                <tr key={etudiant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {etudiant.user.prenom} {etudiant.user.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {etudiant.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {etudiant.matricule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/chef-departement/gestion-etudiants/${etudiant.id}/modifier`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Modifier
                      </Link>
                      <SupprimerEtudiantButton etudiant={etudiant} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
