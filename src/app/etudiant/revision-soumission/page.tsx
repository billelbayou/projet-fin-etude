"use client";
import { AnneeNote } from "@/types";
import { getTotalCredits } from "@/utils/getCredits";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RevisionSoumission() {
  const { data: session } = useSession();
  const [nonSoumis, setNonSoumis] = useState<AnneeNote[]>([]);
  const [soumis, setSoumis] = useState<AnneeNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCommentId, setShowCommentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnneeNotes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/transcripts`);

        if (!response.ok) {
          throw new Error("Failed to fetch academic year notes");
        }

        const data = await response.json();
        const validNotes = data.filter(
          (note: AnneeNote) => note.statut !== null
        );

        setNonSoumis(validNotes.filter((note: AnneeNote) => !note.soumission));
        setSoumis(validNotes.filter((note: AnneeNote) => note.soumission));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchAnneeNotes();
    }
  }, [session]);

  const handleSubmitToDepartment = async (anneeNoteId: string) => {
    try {
      const response = await fetch(`/api/etudiants/soumission/${anneeNoteId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to submit to department");
      }

      // Refresh the lists
      const updatedResponse = await fetch(`/api/transcripts`);
      const updatedData = await updatedResponse.json();
      const validNotes = updatedData.filter(
        (note: AnneeNote) => note.statut !== null
      );

      setNonSoumis(validNotes.filter((note: AnneeNote) => !note.soumission));
      setSoumis(validNotes.filter((note: AnneeNote) => note.soumission));

      alert("Soumission envoyée avec succès!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert("Erreur lors de la soumission: " + err.message);
    }
  };

  const toggleComment = (id: string) => {
    setShowCommentId(showCommentId === id ? null : id);
  };

  if (loading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Erreur: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Révision et Soumission des Relevés
      </h1>

      {/* Non-Submitted Transcripts */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Relevés Non Soumis</h2>

        {nonSoumis.length === 0 ? (
          <p className="text-gray-600">Aucun relevé non soumis disponible.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Année Universitaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Moyenne
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crédits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nonSoumis.map((note) => (
                  <tr key={note.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {note.anneeUniv.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {note.moyenne?.toFixed(2) || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {note.credits || "0"} / {getTotalCredits(note)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          note.statut
                        )}`}
                      >
                        {getStatusText(note.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/etudiant/revision-soumission/preview/${note.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Prévisualiser
                        </Link>
                        <button
                          onClick={() => handleSubmitToDepartment(note.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Soumettre
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submitted Transcripts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Relevés Soumis</h2>

        {soumis.length === 0 ? (
          <p className="text-gray-600">Aucun relevé soumis disponible.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Année Universitaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut de Soumission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {soumis.map((note) =>
                  !note.soumission ? (
                    // If note.soumission is null, skip rendering this row
                    <React.Fragment key={note.id} />
                  ) : (
                    // Skip if note is null
                    <React.Fragment key={note.id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {note.anneeUniv.nom}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubmissionStatusColor(
                                note.soumission.statut
                              )}`}
                            >
                              {getSubmissionStatusText(note.soumission.statut)}
                            </span>
                            {note.soumission.statut === "REJECTED" && (
                              <button
                                onClick={() => toggleComment(note.id)}
                                className="ml-2 text-xs text-red-500 hover:text-red-700"
                              >
                                {showCommentId === note.id
                                  ? "Masquer"
                                  : "Voir commentaire"}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <span className="font-medium">Soumis:</span>{" "}
                            {new Date(
                              note.soumission.dateSoumission
                            ).toLocaleDateString()}
                          </div>
                          {note.soumission.dateValidation && (
                            <div className="text-xs text-gray-500">
                              <span className="font-medium">Traité:</span>{" "}
                              {new Date(
                                note.soumission.dateValidation
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/etudiant/revision-soumission/preview/${note.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Prévisualiser
                            </Link>
                            {note.soumission.statut === "APPROVED" && (
                              <Link
                                href={`/etudiant/revision-soumission/ministerial/${note.id}`}
                                passHref
                                className="text-blue-600 hover:text-blue-900 flex items-center"
                              >
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                Voir le format ministériel
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                      {note.soumission.statut === "REJECTED" &&
                        showCommentId === note.id && (
                          <tr className="bg-red-50">
                            <td colSpan={4} className="px-6 py-4">
                              <div className="text-red-700">
                                <strong>
                                  Commentaire du chef de département:
                                </strong>
                                <p className="mt-1 whitespace-pre-wrap">
                                  {note.soumission.commentaire ||
                                    "Aucun commentaire fourni"}
                                </p>
                                {note.soumission.statut === "REJECTED" && (
                                  <button
                                    onClick={() =>
                                      handleSubmitToDepartment(note.id)
                                    }
                                    className="mt-2 text-sm text-green-600 hover:text-green-800 font-medium"
                                  >
                                    Resoumettre
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
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

function getSubmissionStatusText(status: string) {
  switch (status) {
    case "PENDING":
      return "En attente";
    case "APPROVED":
      return "Approuvé";
    case "REJECTED":
      return "Rejeté";
    case "REVISED":
      return "À réviser";
    default:
      return "Inconnu";
  }
}

function getSubmissionStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "REVISED":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}