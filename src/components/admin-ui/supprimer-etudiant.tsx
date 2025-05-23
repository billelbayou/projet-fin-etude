"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";

export function SupprimerEtudiantButton({
  etudiant,
}: {
  etudiant: { id: string; user: { nom: string; prenom: string } };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/etudiants/${etudiant.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }

      toast.success("Étudiant supprimé avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'étudiant");
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:text-red-900 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Supprimer l&apos;étudiant</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer l&apos;étudiant {etudiant.user.prenom}{" "}
            {etudiant.user.nom} ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
