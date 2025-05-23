// app/etudiant/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getPersonalInfos from "@/utils/getPersonalInfos";

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
  if (!user) {
    redirect("/login");
  }
  if (user.Utilisateur.role !== "ADMIN") {
    redirect("/login");
  }

  return children;
}
