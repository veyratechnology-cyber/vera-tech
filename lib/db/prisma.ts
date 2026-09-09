import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client singleton for database access
 * Prevents multiple instances in development hot-reload
 * Optimized for Vercel serverless with connection pooling
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Force connection pooling mode for authentication
const datasourceUrl = process.env.DATABASE_URL;

// Optimized configuration for Vercel serverless
const prismaClientOptions = {
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  datasources: {
    db: {
      url: datasourceUrl,
    },
  },
  // Optimize for serverless
  errorFormat: "minimal" as const,
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Ensure clean disconnection on process termination
if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}

export default prisma;
