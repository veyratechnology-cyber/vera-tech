import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client Singleton
 * Ensures only one instance is created in development (prevents hot reload issues)
 * Optimized for Vercel serverless environment
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Optimized configuration for serverless
const prismaClientOptions = {
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  errorFormat: "minimal" as const,
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown for production
if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}

