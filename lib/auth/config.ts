import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/db/prisma";

/**
 * NextAuth Configuration
 * Secure authentication for VeyraTech administrators
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
        console.log("[AUTH] authorize() started");

        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] REJECTED: missing credentials");
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        console.log("[AUTH] email received");

        // Find admin user with retry logic and better error handling
        let admin;
        let retries = 3;
        let lastError: Error | null = null;
        
        while (retries > 0) {
          try {
            admin = await prisma.admin.findUnique({
              where: { email: email },
            });
            console.log("[AUTH] database query completed");
            console.log("[AUTH] user found:", Boolean(admin));
            break; // Success, exit retry loop
          } catch (error) {
            retries--;
            lastError = error as Error;
            const errorMsg = error instanceof Error ? error.message : String(error);
            console.error(`[AUTH] database error (attempt ${3 - retries}/3):`, errorMsg);
            
            if (retries === 0) {
              // After all retries failed, return null instead of throwing
              console.error("[AUTH] All database connection attempts failed");
              return null;
            }
            
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
          }
        }

        if (!admin) {
          console.log("[AUTH] REJECTED: user not found or database error");
          return null;
        }

        console.log("[AUTH] user status:", admin.status);

        // Check if admin is active
        if (admin.status !== "ACTIVE") {
          console.log("[AUTH] REJECTED: account inactive");
          return null;
        }

        // Verify password
        console.log("[AUTH] starting password verification");
        let isPasswordValid;
        try {
          isPasswordValid = await compare(
            credentials.password,
            admin.passwordHash
          );
          console.log("[AUTH] password verification completed:", isPasswordValid);
        } catch (error) {
          console.error("[AUTH] password verification error:", error instanceof Error ? error.message : String(error));
          return null;
        }

        if (!isPasswordValid) {
          console.log("[AUTH] REJECTED: invalid password");
          return null;
        }

        console.log("[AUTH] authentication successful");

        // Update last login (non-blocking)
        prisma.admin.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        }).catch(err => {
          console.error("[AUTH] failed to update last login:", err instanceof Error ? err.message : String(err));
        });

        // Create audit log (non-blocking)
        prisma.auditLog.create({
          data: {
            adminId: admin.id,
            action: "ADMIN_LOGIN",
            resource: "Admin",
            resourceId: admin.id,
            result: "SUCCESS",
          },
        }).catch(err => {
          console.error("[AUTH] failed to create audit log:", err instanceof Error ? err.message : String(err));
        });

        console.log("[AUTH] returning user object");
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};
