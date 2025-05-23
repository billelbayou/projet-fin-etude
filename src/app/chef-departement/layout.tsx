// app/admin/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminHeaderNavigation from "@/components/admin-ui/admin-header"; // updated path/name
import getPersonalInfos from "@/utils/getPersonalInfos";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const user = await getPersonalInfos(session);
  if (user.Utilisateur.role !== "CHEF_DEPARTEMENT") {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <AdminHeaderNavigation>{children}</AdminHeaderNavigation>
    </SessionProvider>
  );
}
