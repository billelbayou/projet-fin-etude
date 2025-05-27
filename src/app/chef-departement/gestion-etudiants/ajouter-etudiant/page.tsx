"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createEtudiant } from "@/lib/auth-actions";

export default function AjouterEtudiantPage() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(createEtudiant, null);

  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error);
      } else {
        toast.success("Étudiant créé avec succès");
        router.push("/chef-departement/gestion-etudiants");
      }
    }
  }, [state, router]);
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ajouter un nouvel étudiant</h1>

      <form action={dispatch} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prenom" className="block font-medium">
            Prénom *
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nom" className="block font-medium">
            Nom *
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="motDePasse" className="block font-medium">
            Mot de passe *
          </label>
          <input
            id="motDePasse"
            name="motDePasse"
            type="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="matricule" className="block font-medium">
            Matricule *
          </label>
          <input
            id="matricule"
            name="matricule"
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Création en cours..." : "Créer l'étudiant"}
          </Button>
          <button
            type="button"
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => router.push("/chef-departement/gestion-etudiants")}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
