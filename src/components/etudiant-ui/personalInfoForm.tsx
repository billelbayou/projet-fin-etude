// components/CombinedStudentForm.tsx
"use client";

import { updateInfo } from "@/lib/info-actions";
import { Domains, Filieres, Specialites } from "@/lib/types";
import { EtudiantUtilisateur } from "@/lib/types";
import { useActionState, useState } from "react";

export default function CombinedStudentForm({
  EtudiantUtilisateur,
}: {
  EtudiantUtilisateur: EtudiantUtilisateur;
}) {
  const [formData, setFormData] = useState({
    // Personal Info
    prenom: EtudiantUtilisateur.Utilisateur.prenom,
    nom: EtudiantUtilisateur.Utilisateur.nom,
    email: EtudiantUtilisateur.Utilisateur.email || "",
    numeroInscription: EtudiantUtilisateur.Etudiant.numeroInscription,
    dateNaissance:
      EtudiantUtilisateur.Etudiant.dateNaissance?.toISOString().split("T")[0] ||
      "",
    lieuNaissance: EtudiantUtilisateur.Etudiant.lieuNaissance || "",

    // Academic Info
    domaine: EtudiantUtilisateur.Etudiant.domaine || "",
    filiere: EtudiantUtilisateur.Etudiant.filiere || "",
    specialite: EtudiantUtilisateur.Etudiant.specialite || "",
    diplomeType: EtudiantUtilisateur.Etudiant.diplomeType || "licence",
    anneeUniversitaireDebut:
      EtudiantUtilisateur.Etudiant.anneeUniversitaireDebut || "",
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch, isPending] = useActionState(updateInfo, null);
  return (
    <form action={dispatch} className="space-y-6">
      <input type="hidden" name="id" value={EtudiantUtilisateur.Etudiant.id} />
      {/* Personal Information Section (unchanged) */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Informations Personnelles
        </h3>

        <div>
          <label
            htmlFor="prenom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
          />
        </div>

        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
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
            name="numeroInscription"
            value={formData.numeroInscription}
            onChange={handleChange}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
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
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            placeholder="JJ/MM/AAAA"
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
            placeholder="Entrez votre lieu de naissance"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Informations Académiques
        </h3>

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
            required
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
            required
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
            required
          >
            <option value="">Sélectionner une spécialité</option>
            {getAvailableSpecialites().map((specialite) => (
              <option key={specialite} value={specialite}>
                {specialite}
              </option>
            ))}
          </select>
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
            name="diplomeType"
            value={formData.diplomeType}
            onChange={handleChange}
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
            name="anneeUniversitaireDebut"
            value={formData.anneeUniversitaireDebut}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          disabled={isPending}
        >
          {isPending ? "En cours..." : "Mettre à jour toutes les informations"}
        </button>
      </div>
    </form>
  );
}
