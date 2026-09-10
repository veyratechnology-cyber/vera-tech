import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { safePrismaQuery } from "@/lib/prisma";
import prisma from "@/lib/db/prisma";

/**
 * NextAuth Configuration - Production Ready
 * Secure authentication with proper session and cookie management
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTH] Login attempt started");

        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Missing credentials");
          return null;
        }

        const email = credentials.email.trim().toLowerCase();

        // Use safe Prisma query with auto-reconnect
        try {
          const admin = await safePrismaQuery(async (client) => {
            return client.admin.findUnique({
              where: { email },
              select: {
                id: true,
                email: true,
                name: true,
                passwordHash: true,
                status: true,
              },
            });
          }, 5); // 5 retries with exponential backoff

          if (!admin) {
            console.log("[AUTH] User not found");
            return null;
          }

          if (admin.status !== "ACTIVE") {
            console.log("[AUTH] Account inactive");
            return null;
          }

          // Verify password with timeout protection
          const isPasswordValid = await Promise.race([
            compare(credentials.password, admin.passwordHash),
            new Promise<boolean>((_, reject) =>
              setTimeout(() => reject(new Error("Password verification timeout")), 10000)
            ),
          ]);

          if (!isPasswordValid) {
            console.log("[AUTH] Invalid password");
            return null;
          }

          console.log("[AUTH] Login successful:", email);

          // Non-blocking: Update last login
          prisma.admin
            .update({
              where: { id: admin.id },
              data: { lastLoginAt: new Date() },
            })
            .catch((err) => console.error("[AUTH] Update last login failed:", err.message));

          // Non-blocking: Create audit log
          prisma.auditLog
            .create({
              data: {
                adminId: admin.id,
                action: "ADMIN_LOGIN",
                resource: "Admin",
                resourceId: admin.id,
                result: "SUCCESS",
              },
            })
            .catch((err) => console.error("[AUTH] Audit log failed:", err.message));

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
          };
        } catch (error) {
          console.error("[AUTH] Database error:", error instanceof Error ? error.message : String(error));
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin-login",
    error: "/admin-login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every hour
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60, // 24 hours
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
