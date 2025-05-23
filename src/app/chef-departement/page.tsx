import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";

export default async function AdminHomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const chefDep = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      managedDepartment: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!chefDep) {
    return <div className="text-red-500">Chef Departement introuvable.</div>;
  }

  if (!chefDep.managedDepartment) {
    return (
      <div className="text-red-500">
        Vous n&apos;êtes pas assigné à un département.
      </div>
    );
  }

  const countEtudiants = await prisma.etudiant.count({
    where: {
      departementId: chefDep.managedDepartment.id,
    },
  });

  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Bienvenue,{" "}
          {chefDep.role === "CHEF_DEPARTEMENT" ? "Monsieur" : "Madame"}{" "}
          {chefDep.prenom} {chefDep.nom}
        </h1>

        <div className="divide-y divide-gray-200 text-lg">
          <Info label="Prénom" value={chefDep.prenom} />
          <Info label="Nom" value={chefDep.nom} />
          <Info label="Email" value={chefDep.email} />
          <Info
            label="Département"
            value={chefDep.managedDepartment?.name || "Non assigné"}
          />
          <Info label="Nombre d'Étudiants" value={String(countEtudiants)} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-4">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}
