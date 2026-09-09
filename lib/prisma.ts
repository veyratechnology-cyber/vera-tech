import { PrismaClient, Prisma } from "@prisma/client";

/**
 * Prisma Client Singleton
 * Ensures only one instance is created in development (prevents hot reload issues)
 * Optimized for Vercel serverless environment with proper TypeScript typing
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Properly typed Prisma configuration for serverless deployment
const logConfig: Prisma.LogLevel[] = 
  process.env.NODE_ENV === "development" 
    ? ["error", "warn"] 
    : ["error"];

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: logConfig,
  errorFormat: "minimal",
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

