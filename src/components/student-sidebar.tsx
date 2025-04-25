// components/SidebarNavigation.tsx
import Link from "next/link";
import { signOut } from "@/auth";
import { auth } from "@/auth";

export default async function SidebarNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const currentPath = "/etudiant"; // You'll need to pass this as prop or find alternative

  const menuItems = [
    {
      href: "/etudiant/informations-personnelles",
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
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Portail Étudiant
          </h2>
          <p className="text-sm text-gray-600">
            Bienvenue, {session.user.name}
          </p>
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
        <div className="p-4 border-t border-gray-200 mt-auto">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Se Déconnecter
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
