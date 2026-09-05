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
        console.log("[AUTH] email received:", Boolean(credentials?.email));
        console.log("[AUTH] password received:", Boolean(credentials?.password));

        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] REJECTED: missing credentials");
          throw new Error("Email and password are required");
        }

        const email = credentials.email.trim().toLowerCase();
        console.log("[AUTH] normalized email:", email);

        // Find admin user with retry logic
        let admin;
        let retries = 3;
        
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
            console.error(`[AUTH] database error (${3 - retries}/3):`, error instanceof Error ? error.message : String(error));
            
            if (retries === 0) {
              throw new Error("Database connection failed after 3 attempts");
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        if (!admin) {
          console.log("[AUTH] REJECTED: user not found");
          throw new Error("Invalid email or password");
        }

        console.log("[AUTH] user status:", admin.status);

        // Check if admin is active
        if (admin.status !== "ACTIVE") {
          console.log("[AUTH] REJECTED: account inactive");
          throw new Error("Account is inactive");
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
          throw new Error("Password verification failed");
        }

        if (!isPasswordValid) {
          console.log("[AUTH] REJECTED: invalid password");
          throw new Error("Invalid email or password");
        }

        console.log("[AUTH] authentication successful");

        // Update last login
        try {
          await prisma.admin.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() },
          });
        } catch (error) {
          console.error("[AUTH] failed to update last login:", error instanceof Error ? error.message : String(error));
        }

        // Create audit log
        try {
          await prisma.auditLog.create({
            data: {
              adminId: admin.id,
              action: "ADMIN_LOGIN",
              resource: "Admin",
              resourceId: admin.id,
              result: "SUCCESS",
            },
          });
        } catch (error) {
          console.error("[AUTH] failed to create audit log:", error instanceof Error ? error.message : String(error));
        }

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
