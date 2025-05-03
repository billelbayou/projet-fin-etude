import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { schema } from "./lib/zod-schema";
import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = schema.parse(credentials);

        const user = await prisma.utilisateur.findUnique({
          where: { email },
        });

        if (!user) {
          throw new AuthError("Cet email n'existe pas");
        }

        const isPasswordValid = await bcrypt.compare(password, user.motDePasse);

        if (!isPasswordValid) {
          throw new AuthError("Mot de passe incorrect");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
