"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function AdminSidebarNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  const menuItems: {
    href: string;
    number: number;
    label: string;
  }[] = [
    {
      href: "/admin",
      number: 1,
      label: "Informations Personnelles",
    },
    {
      href: "/admin/canevas-releves",
      number: 2,
      label: "Canevas de Relevés",
    },
    {
      href: "/admin/releves-etudiants",
      number: 3,
      label: "Relevés des Étudiants",
    },
    {
      href: "/admin/gestion-etudiants",
      number: 4,
      label: "Gestion des Etudiants",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Admin version with purple theme */}
      <div className="w-64 bg-white shadow-md flex flex-col h-screen fixed">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Portail Administrateur
          </h2>
          <p className="text-sm text-gray-600">Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`mr-3 p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-purple-800"
                  }`}
                >
                  {item.number}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto ml-64">{children}</div>
    </div>
  );
}
