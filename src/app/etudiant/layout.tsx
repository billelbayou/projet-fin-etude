// app/etudiant/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarNavigation from "@/components/etudiant-ui/student-sidebar";
import getPersonalInfos from "@/utils/getPersonalInfos";

export default async function EtudiantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const personalInfo = await getPersonalInfos(session);
  const studentProgression = personalInfo.Etudiant.progression;
  return <SidebarNavigation studentProgression={studentProgression}>{children}</SidebarNavigation>;
}
