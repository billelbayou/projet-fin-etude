"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin-ui/admin-logout-button";

export default function AdminHeaderNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  const menuItems = [
    { href: "/chef-departement", label: "Informations Personnelles" },
    {
      href: "/chef-departement/gestion-etudiants",
      label: "Gestion des Étudiants",
    },
    { href: "/chef-departement/canevas-releves", label: "Canevas de Relevés" },
    {
      href: "/chef-departement/releves-etudiants",
      label: "Relevés des Étudiants",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-stretch justify-between h-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Chef de Département
            </h2>
          </div>

          <nav className="flex space-x-4 items-stretch ml-10">
            {menuItems.map((item) => {
              const isActive = currentPath.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 text-sm font-medium transition-colors border-b-2 ${
                    isActive
                      ? "text-purple-700 border-purple-600"
                      : "text-gray-700 border-transparent hover:border-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center">
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
