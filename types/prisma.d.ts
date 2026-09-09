/**
 * Prisma Type Definitions
 * Ensures type safety across the application
 */

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export {};
