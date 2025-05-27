// app/revision-soumission/preview/[id]/page.tsx
import { ModuleNote, SemestreNote, UniteNote } from "@/types";
import { getTotalCredits } from "@/utils/getCredits";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/transcripts/${id}`);
  if (!response.ok) {
    return notFound();
  }
  const data = await response.json();
  const anneeNote = data.data;
  if (!anneeNote) {
    return notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Prévisualisation du Relevé - {anneeNote.anneeUniv?.nom}
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">
              Étudiant: {anneeNote.etudiant?.user?.nom}{" "}
              {anneeNote.etudiant?.user?.prenom}
            </h2>
            <p className="text-gray-600">
              Matricule: {anneeNote.etudiant?.matricule}
            </p>
          </div>
          <div className="flex space-x-4">
            <span className="text-sm">
              Moyenne: {anneeNote.moyenne?.toFixed(2)}
            </span>
            <span className="text-sm">
              Crédits: {anneeNote.credits} / {getTotalCredits(anneeNote)}
            </span>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                anneeNote.statut
              )}`}
            >
              {getStatusText(anneeNote.statut)}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Élément
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note/Moyenne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crédits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coefficient
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anneeNote.semestreNotes?.map((semestreNote: SemestreNote) => (
                <React.Fragment key={semestreNote.id}>
                  {/* Semester Row */}
                  <tr className="bg-blue-50 font-semibold">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      📚 {semestreNote.semestre?.nom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {semestreNote.note?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {semestreNote.credits}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {semestreNote.semestre?.coefficient}
                    </td>
                  </tr>

                  {/* Units under this semester */}
                  {semestreNote.uniteNotes?.map((uniteNote: UniteNote) => (
                    <React.Fragment key={uniteNote.id}>
                      <tr className="bg-gray-50">
                        <td className="px-10 py-3 text-sm text-gray-700">
                          📂 <strong>UE:</strong> {uniteNote.unite?.nom}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {uniteNote.note?.toFixed(2)}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {uniteNote.credits}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {uniteNote.unite?.coefficient}
                        </td>
                      </tr>

                      {/* Modules under this unit */}
                      {uniteNote.moduleNotes?.map((moduleNote: ModuleNote) => (
                        <tr key={moduleNote.id} className="hover:bg-gray-25">
                          <td className="px-16 py-2 text-sm text-gray-600">
                            📄 {moduleNote.module?.nom}
                          </td>
                          <td className="px-6 py-2 text-sm text-gray-600">
                            {moduleNote.note?.toFixed(2)}
                          </td>
                          <td className="px-6 py-2 text-sm text-gray-600">
                            {moduleNote.credits}
                          </td>
                          <td className="px-6 py-2 text-sm text-gray-600">
                            {moduleNote.module?.coefficient}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">
              Moyenne Générale
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {anneeNote.moyenne?.toFixed(2) || "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">
              Crédits Obtenus
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {anneeNote.credits} / {getTotalCredits(anneeNote)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Statut</h3>
            <p
              className={`text-xl font-bold ${getStatusTextColor(
                anneeNote.statut
              )}`}
            >
              {getStatusText(anneeNote.statut)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Link
            href="/etudiant/revision-soumission"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200"
          >
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getStatusText(status: string) {
  switch (status) {
    case "PASSED":
      return "Validé";
    case "PASSED_WITH_DEBT":
      return "Validé avec dettes";
    case "FAILED":
      return "Non validé";
    default:
      return "Non soumis";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "PASSED":
      return "bg-green-100 text-green-800";
    case "PASSED_WITH_DEBT":
      return "bg-yellow-100 text-yellow-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusTextColor(status: string) {
  switch (status) {
    case "PASSED":
      return "text-green-600";
    case "PASSED_WITH_DEBT":
      return "text-yellow-600";
    case "FAILED":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}
