import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Page Admin</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg">Bienvenue, {user.email}</p>
        </div>
      )}
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
