import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Gestion des Notes",
  description: "Système de gestion des notes pour l'université",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
