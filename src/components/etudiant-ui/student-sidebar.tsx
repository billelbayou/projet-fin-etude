"use client";
// components/SidebarNavigation.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { ProgressionEtudiant } from "@prisma/client";

// Define the progression order based on the provided enum
const PROGRESSION_ORDER: ProgressionEtudiant[] = [
  "initial",
  "informationComplete",
  "transcriptConfigured",
  "transcriptFilled",
];

export default function SidebarNavigation({
  children,
  studentProgression,
}: {
  children: React.ReactNode;
  studentProgression: ProgressionEtudiant;
}) {
  const currentPath = usePathname();

  const menuItems: {
    href: string;
    number: number;
    label: string;
    phase: ProgressionEtudiant;
  }[] = [
    {
      href: "/etudiant",
      number: 1,
      label: "Informations Personnelles",
      phase: "initial",
    },
    {
      href: "/etudiant/configuration-releves",
      number: 2,
      label: "Configuration des Relevés",
      phase: "informationComplete",
    },
    {
      href: "/etudiant/remplir-releves",
      number: 3,
      label: "Remplir les Relevés",
      phase: "transcriptConfigured",
    },
    {
      href: "/etudiant/revision",
      number: 4,
      label: "Révision et Soumission",
      phase: "transcriptFilled",
    },
  ];

  // Function to check if a phase has been passed
  const hasPassedPhase = (phase: ProgressionEtudiant) => {
    const currentIndex = PROGRESSION_ORDER.indexOf(studentProgression);
    const phaseIndex = PROGRESSION_ORDER.indexOf(phase);
    return currentIndex > phaseIndex;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col h-screen fixed">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Portail Étudiant
          </h2>
          <p className="text-sm text-gray-600">Bienvenue</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isPassed = hasPassedPhase(item.phase);
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`mr-3 p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-indigo-800 ${
                    isPassed ? "bg-green-400" : "bg-gray-100"
                  }`}
                >
                  {item.number}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Déconnexion */}
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto ml-64">{children}</div>
    </div>
  );
}
