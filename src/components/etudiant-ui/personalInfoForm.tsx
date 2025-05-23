"use client";

import { updateInfo } from "@/lib/info-actions";
import { Domains, Filieres, Specialites } from "@/lib/types";
import { EtudiantUtilisateur } from "@/lib/types";
import { useActionState, useState } from "react";
import { toast } from "sonner";

export default function CombinedStudentForm({
  utilisateur,
}: {
  utilisateur: EtudiantUtilisateur;
}) {
  const [formData, setFormData] = useState({
    // Personal Info (read-only)
    prenom: utilisateur.Utilisateur.prenom,
    nom: utilisateur.Utilisateur.nom,
    email: utilisateur.Utilisateur.email || "",
    numeroInscription: utilisateur.Etudiant?.matricule || "",

    // Editable personal info
    dateNaissance:
      utilisateur.Etudiant?.dateNaissance?.toISOString().split("T")[0] || "",
    lieuNaissance: utilisateur.Etudiant?.lieuNaissance || "",

    // Academic Info (editable)
    domaine: utilisateur.Etudiant?.domaine || "",
    filiere: utilisateur.Etudiant?.filiere || "",
    specialite: utilisateur.Etudiant?.specialite || "",
    diplomeType: utilisateur.Etudiant?.typeDiplome || "licence",
    anneeUniversitaireDebut:
      utilisateur.Etudiant?.anneeUniversitaireDebut || "",
  });

  // Get available filières based on selected domaine
  const getAvailableFilieres = () => {
    if (formData.domaine === "Mathématiques et Informatique")
      return Filieres.MI;
    if (formData.domaine === "Sciences et Technologie") return Filieres.ST;
    return [];
  };

  // Get available spécialités based on selected filière
  const getAvailableSpecialites = () => {
    if (formData.filiere === "Informatique") return Specialites.I;
    if (formData.filiere === "Sciences et Technologie") return Specialites.ST;
    return [];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Reset dependent fields when domaine changes
    if (name === "domaine") {
      setFormData((prev) => ({
        ...prev,
        domaine: value,
        filiere: "",
        specialite: "",
      }));
    }
    // Reset specialite when filiere changes
    else if (name === "filiere") {
      setFormData((prev) => ({
        ...prev,
        filiere: value,
        specialite: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [state, dispatch, isPending] = useActionState(updateInfo, null);
  if (state) {
    if (state.success) {
      toast.success("Informations mises à jour avec succès");
    } else {
      toast.error(
        state.error || "Une erreur est survenue lors de la mise à jour"
      );
    }
  }

  return (
    <form action={dispatch} className="space-y-6">
      <input type="hidden" name="id" value={utilisateur.Etudiant?.id} />

      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Informations Personnelles
        </h3>

        {/* Read-only Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {formData.prenom}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {formData.nom}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {formData.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Matricule
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
              {formData.numeroInscription}
            </div>
          </div>
        </div>

        {/* Editable Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
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
              name="lieuNaissance"
              value={formData.lieuNaissance}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Informations Académiques
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="domaine"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Domaine
            </label>
            <select
              id="domaine"
              name="domaine"
              value={formData.domaine}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Sélectionner un domaine</option>
              {Domains.map((domaine) => (
                <option key={domaine} value={domaine}>
                  {domaine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filiere"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filière
            </label>
            <select
              id="filiere"
              name="filiere"
              value={formData.filiere}
              onChange={handleChange}
              disabled={!formData.domaine}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            >
              <option value="">Sélectionner une filière</option>
              {getAvailableFilieres().map((filiere) => (
                <option key={filiere} value={filiere}>
                  {filiere}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="specialite"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Spécialité
            </label>
            <select
              id="specialite"
              name="specialite"
              value={formData.specialite}
              onChange={handleChange}
              disabled={!formData.filiere}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            >
              <option value="">Sélectionner une spécialité</option>
              {getAvailableSpecialites().map((specialite) => (
                <option key={specialite} value={specialite}>
                  {specialite}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="diplomeType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type de diplôme
            </label>
            <select
              id="diplomeType"
              name="diplomeType"
              value={formData.diplomeType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="licence">Licence</option>
              <option value="master">Master</option>
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
              name="anneeUniversitaireDebut"
              value={formData.anneeUniversitaireDebut}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          disabled={isPending}
        >
          {isPending ? "En cours..." : "Mettre à jour les informations"}
        </button>
      </div>
    </form>
  );
}
