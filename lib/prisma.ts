import { PrismaClient, Prisma } from "@prisma/client";

/**
 * Prisma Client Singleton with Auto-Reconnection
 * Prevents crashes from lost database connections
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Properly typed Prisma configuration with connection management
const logConfig: Prisma.LogLevel[] = 
  process.env.NODE_ENV === "development" 
    ? ["error", "warn"] 
    : ["error"];

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: logConfig,
  errorFormat: "minimal",
};

// Create Prisma client with error handling
function createPrismaClient() {
  const client = new PrismaClient(prismaClientOptions);
  
  // Add connection error handling
  if (typeof window === 'undefined') {
    client.$connect().catch((error) => {
      console.error('[PRISMA] Initial connection failed:', error.message);
      // Don't throw - allow retry on first query
    });
  }
  
  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Wrapper for Prisma queries with automatic reconnection
 */
export async function safePrismaQuery<T>(
  queryFn: (client: PrismaClient) => Promise<T>,
  retries = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await queryFn(prisma);
    } catch (error: any) {
      const isConnectionError = 
        error.message?.includes('connection') ||
        error.message?.includes('ECONNREFUSED') ||
        error.message?.includes('ETIMEDOUT') ||
        error.code === 'P1001' || // Can't reach database server
        error.code === 'P1002' || // Database server timeout
        error.code === 'P1003';   // Database doesn't exist
      
      if (isConnectionError && i < retries - 1) {
        console.warn(`[PRISMA] Connection error, retrying (${i + 1}/${retries})...`);
        
        // Try to reconnect
        try {
          await prisma.$disconnect();
          await prisma.$connect();
        } catch (reconnectError) {
          console.error('[PRISMA] Reconnection failed:', reconnectError);
        }
        
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        continue;
      }
      
      throw error;
    }
  }
  
  throw new Error('Prisma query failed after all retries');
}

