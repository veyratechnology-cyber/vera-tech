import { PrismaClient, Prisma } from "@prisma/client";

/**
 * Prisma Client singleton for database access
 * Prevents multiple instances in development hot-reload
 * Optimized for Vercel serverless with proper TypeScript typing
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Properly typed log configuration
const logConfig: Prisma.LogLevel[] = 
  process.env.NODE_ENV === "development" 
    ? ["error", "warn"] 
    : ["error"];

// Properly typed Prisma client options
const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: logConfig,
  errorFormat: "minimal",
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
