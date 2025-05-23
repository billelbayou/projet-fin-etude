// app/etudiant/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarNavigation from "@/components/etudiant-ui/student-sidebar";
import getPersonalInfos from "@/utils/getPersonalInfos";
import { SessionProvider } from "next-auth/react";

export default async function EtudiantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const user = await getPersonalInfos(session);
  if (!user) {
    redirect("/login");
  }
  if (user.Utilisateur.role !== "ETUDIANT") {
    redirect("/login");
  }
  if (!user.Etudiant) {
    redirect("/login");
  }
  const studentProgression = user.Etudiant.progression;
  return (
    <SessionProvider session={session}>
      <SidebarNavigation studentProgression={studentProgression}>
        {children}
      </SidebarNavigation>
    </SessionProvider>
  );
}
