import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

// 7 hari dalam detik
const expiredToken = 7 * 60 * 60 * 24;

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // Gunakan "jwt" sebagai nilai yang valid
    maxAge: expiredToken,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.exp = Math.floor(Date.now() / 1000) + expiredToken; // Expire dalam 7 hari
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

// Ekspor default
export default NextAuth(authOptions);
