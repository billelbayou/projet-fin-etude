"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/admin-ui/admin-logout-button";
import { Departement } from "@/types";


export default function PageAdminDepartements() {
  const router = useRouter();
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formulaire, setFormulaire] = useState({
    nomDepartement: "",
    prenomChef: "",
    nomChef: "",
    emailChef: "",
    motDePasseChef: "",
  });

  // get departements
  useEffect(() => {
    const getDepartements = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin-api");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des départements");
        const data = await response.json();
        setDepartements(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDepartements();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulaire((prev) => ({ ...prev, [name]: value }));
  };

  const handleAjouterDepartement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulaire),
      });

      if (!response.ok) throw new Error("Échec de la création du département");

      const result = await response.json();
      setDepartements([...departements, result]);
      setFormulaire({
        nomDepartement: "",
        prenomChef: "",
        nomChef: "",
        emailChef: "",
        motDePasseChef: "",
      });
      router.refresh();
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">
          Gestion des Départements
        </h1>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Créer un nouveau département et un chef
          </h2>
          <form onSubmit={handleAjouterDepartement} className="space-y-6">
            {/* Infos Département */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Informations du Département
              </h3>
              <input
                type="text"
                name="nomDepartement"
                placeholder="Nom du département"
                value={formulaire.nomDepartement}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Infos Chef */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Informations du Chef
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="prenomChef"
                  placeholder="Prénom"
                  value={formulaire.prenomChef}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="nomChef"
                  placeholder="Nom"
                  value={formulaire.nomChef}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-md"
                />
                <input
                  type="email"
                  name="emailChef"
                  placeholder="Adresse e-mail"
                  value={formulaire.emailChef}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-md col-span-2"
                />
                <input
                  type="password"
                  name="motDePasseChef"
                  placeholder="Mot de passe"
                  value={formulaire.motDePasseChef}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-md col-span-2"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              {isLoading ? "Création en cours..." : "Créer le département"}
            </button>
          </form>
        </div>

        {/* Liste des départements */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Départements existants
          </h2>
          {departements.length === 0 ? (
            <p className="text-gray-500">Aucun département pour le moment.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">Nom de Departemenet</th>
                  <th className="py-2">Nome de Chef</th>
                  <th className="py-2">Prenom de Chef</th>
                  <th className="py-2">Email de Chef</th>
                </tr>
              </thead>
              <tbody>
                {departements.map((dept, index) => (
                  <tr key={dept.id ?? index} className="border-b">
                    <td className="py-2">{dept.name}</td>
                    <td className="py-2">{dept.chef?.nom || "Non attribué"}</td>
                    <td className="py-2">
                      {dept.chef?.prenom || "Non attribué"}
                    </td>
                    <td className="py-2">
                      {dept.chef?.email || "Non attribué"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
