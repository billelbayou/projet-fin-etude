"use client";
// components/SidebarNavigation.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";


export default function SidebarNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  const menuItems = [
    {
      href: "/etudiant",
      number: 1,
      label: "Informations Personnelles",
    },
    {
      href: "/etudiant/configuration-releves",
      number: 2,
      label: "Configuration des Relevés",
    },
    {
      href: "/etudiant/remplir-releves",
      number: 3,
      label: "Remplir les Relevés",
    },
    {
      href: "/etudiant/revision",
      number: 4,
      label: "Révision et Soumission",
    },
  ];

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
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                currentPath === item.href
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`mr-3 p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs ${
                  currentPath === item.href
                    ? "bg-indigo-100 text-indigo-800 font-bold"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.number}
              </span>
              {item.label}
            </Link>
          ))}
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
