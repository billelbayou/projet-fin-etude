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
    <div
      className="min-h-screen bg-[#0c0d2e] text-white p-4 md:p-8 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
          #0c0d2e
        `,
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl top-32 right-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-2xl bottom-10 left-32 animate-pulse-slow" />
        <div className="absolute w-64 h-64 bg-cyan-500 opacity-15 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gestion des Départements
          </h1>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Créer un nouveau département et un chef
            </h2>
            <form onSubmit={handleAjouterDepartement} className="space-y-6">
              {/* Infos Département */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-200 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3"></div>
                  Informations du Département
                </h3>
                <input
                  type="text"
                  name="nomDepartement"
                  placeholder="Nom du département"
                  value={formulaire.nomDepartement}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                />
              </div>

              {/* Infos Chef */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-200 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
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
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                  />
                  <input
                    type="text"
                    name="nomChef"
                    placeholder="Nom"
                    value={formulaire.nomChef}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                  />
                  <input
                    type="email"
                    name="emailChef"
                    placeholder="Adresse e-mail"
                    value={formulaire.emailChef}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15 col-span-2"
                  />
                  <input
                    type="password"
                    name="motDePasseChef"
                    placeholder="Mot de passe"
                    value={formulaire.motDePasseChef}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15 col-span-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-blue-500/50 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Création en cours..." : "Créer le département"}
              </button>
            </form>
          </div>

          {/* Liste des départements */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Départements existants
            </h2>
            {departements.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                  <span className="text-2xl">📋</span>
                </div>
                <p className="text-gray-400 text-lg">
                  Aucun département pour le moment.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20 text-gray-300">
                      <th className="py-3 px-2 font-semibold text-sm bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Nom de Département
                      </th>
                      <th className="py-3 px-2 font-semibold text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Nom de Chef
                      </th>
                      <th className="py-3 px-2 font-semibold text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Prénom de Chef
                      </th>
                      <th className="py-3 px-2 font-semibold text-sm bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Email de Chef
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {departements.map((dept, index) => (
                      <tr
                        key={dept.id ?? index}
                        className="border-b border-white/10 hover:bg-white/5 transition-all duration-200"
                      >
                        <td className="py-3 px-2 text-gray-200 font-medium">
                          {dept.name}
                        </td>
                        <td className="py-3 px-2 text-gray-300">
                          {dept.chef?.nom || "Non attribué"}
                        </td>
                        <td className="py-3 px-2 text-gray-300">
                          {dept.chef?.prenom || "Non attribué"}
                        </td>
                        <td className="py-3 px-2 text-gray-300 break-all">
                          {dept.chef?.email || "Non attribué"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
