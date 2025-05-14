// app/etudiant/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebarNavigation from "@/components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <AdminSidebarNavigation>{children}</AdminSidebarNavigation>;
}
