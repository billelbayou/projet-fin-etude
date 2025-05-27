"use client";
import { Soumission } from "@/types";
import { getTotalCredits } from "@/utils/getCredits";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ReviewSubmissions() {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState<Soumission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Soumission | null>(null);
  const [decision, setDecision] = useState<"APPROVED" | "REJECTED" | "REVISED">(
    "APPROVED"
  );
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/soumissions`);

        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }

        const data = await response.json();
        setSubmissions(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchSubmissions();
    }
  }, [session]);

  const handleReview = async (submissionId: string) => {
    try {
      const response = await fetch(`/api/soumissions/${submissionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision,
          comment: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Refresh the list
      const updatedResponse = await fetch(`/api/soumissions/`);
      const updatedData = await updatedResponse.json();
      setSubmissions(updatedData);

      // Reset form
      setSelectedSubmission(null);
      setComment("");
      setDecision("APPROVED");

      alert("Décision enregistrée avec succès!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert("Erreur lors de l'enregistrement: " + err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Erreur: {error}</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Relevés Soumis - Revue</h1>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Relevés en attente de validation
        </h2>

        {submissions.length === 0 ? (
          <p className="text-gray-600">Aucun relevé soumis en attente.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Étudiant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Année Universitaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Soumission
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
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {submission.etudiant.user.nom}{" "}
                        {submission.etudiant.user.prenom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {submission.etudiant.matricule}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.anneeNote.anneeUniv.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.dateSoumission).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubmissionStatusColor(
                          submission.statut
                        )}`}
                      >
                        {getSubmissionStatusText(submission.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/chef-departement/releves-etudiants/preview/${submission.anneeNote.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Voir détails
                        </Link>
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Traiter
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

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                Revue du relevé de {selectedSubmission.etudiant.user.prenom}{" "}
                {selectedSubmission.etudiant.user.nom}
              </h2>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Année Universitaire:</h3>
                <p>{selectedSubmission.anneeNote.anneeUniv.nom}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Statut Académique:</h3>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedSubmission.anneeNote.statut
                  )}`}
                >
                  {getStatusText(selectedSubmission.anneeNote.statut)}
                </span>
                <p className="mt-1">
                  Moyenne:{" "}
                  {selectedSubmission.anneeNote.moyenne?.toFixed(2) || "-"}
                </p>
                <p>
                  Crédits: {selectedSubmission.anneeNote.credits || "0"} /{" "}
                  {getTotalCredits(selectedSubmission.anneeNote)}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Décision:
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setDecision("APPROVED")}
                    className={`py-2 px-4 rounded-md border ${
                      decision === "APPROVED"
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-gray-50 border-gray-300 text-gray-700"
                    }`}
                  >
                    Approuver
                  </button>
                  <button
                    onClick={() => setDecision("REJECTED")}
                    className={`py-2 px-4 rounded-md border ${
                      decision === "REJECTED"
                        ? "bg-red-100 border-red-500 text-red-800"
                        : "bg-gray-50 border-gray-300 text-gray-700"
                    }`}
                  >
                    Rejeter
                  </button>
                  <button
                    onClick={() => setDecision("REVISED")}
                    className={`py-2 px-4 rounded-md border ${
                      decision === "REVISED"
                        ? "bg-blue-100 border-blue-500 text-blue-800"
                        : "bg-gray-50 border-gray-300 text-gray-700"
                    }`}
                  >
                    À réviser
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Commentaire:
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ajoutez un commentaire si nécessaire..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {decision === "REJECTED" && (
                  <p className="mt-1 text-sm text-gray-500">
                    Un commentaire est fortement recommandé pour les rejets.
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleReview(selectedSubmission.id)}
                  className={`px-4 py-2 border border-transparent rounded-md text-white ${
                    decision === "APPROVED"
                      ? "bg-green-600 hover:bg-green-700"
                      : decision === "REJECTED"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Enregistrer la décision
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reuse the same helper functions from before
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
