// app/etudiant/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarNavigation from "@/components/student-sidebar";

export default async function EtudiantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <SidebarNavigation>{children}</SidebarNavigation>;
}
