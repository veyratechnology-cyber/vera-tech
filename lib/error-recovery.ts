/**
 * Comprehensive Error Recovery System
 * Prevents crashes and ensures site stability
 */

import { prisma } from "@/lib/prisma";

/**
 * Circuit Breaker Pattern
 * Prevents cascading failures by stopping requests to failing services
 */
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime: number | null = null;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - (this.lastFailureTime || 0) > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      console.error('[CIRCUIT_BREAKER] Circuit opened after', this.failures, 'failures');
    }
  }
  
  getState() {
    return this.state;
  }
}

/**
 * Global circuit breakers for different services
 */
export const circuitBreakers = {
  database: new CircuitBreaker(5, 60000),
  email: new CircuitBreaker(3, 30000),
  calendar: new CircuitBreaker(3, 30000),
};

/**
 * Retry with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        console.log(`[RETRY] Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Safe database query with circuit breaker
 */
export async function safeDbQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<{ data: T; error: string | null }> {
  try {
    const data = await circuitBreakers.database.execute(async () => {
      return await retryWithBackoff(queryFn, 3, 500);
    });
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[SAFE_DB_QUERY] Error:', errorMessage);
    return { data: fallback, error: errorMessage };
  }
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

/**
 * Graceful degradation helper
 */
export function withFallback<T>(
  primaryFn: () => Promise<T>,
  fallbackFn: () => T
): Promise<T> {
  return primaryFn().catch(() => fallbackFn());
}

/**
 * Memory leak prevention
 * Ensures Prisma connections are properly managed
 */
let connectionCheckInterval: NodeJS.Timeout | null = null;

export function startConnectionMonitoring() {
  if (typeof window !== 'undefined') return; // Only in server environment
  
  if (connectionCheckInterval) {
    clearInterval(connectionCheckInterval);
  }
  
  // Check connection health every 5 minutes
  connectionCheckInterval = setInterval(async () => {
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      console.error('[HEALTH_CHECK] Database unhealthy, attempting reconnect...');
      try {
        await prisma.$disconnect();
        await prisma.$connect();
        console.log('[HEALTH_CHECK] Reconnected successfully');
      } catch (error) {
        console.error('[HEALTH_CHECK] Reconnection failed:', error);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Stop connection monitoring (cleanup)
 */
export function stopConnectionMonitoring() {
  if (connectionCheckInterval) {
    clearInterval(connectionCheckInterval);
    connectionCheckInterval = null;
  }
}

/**
 * Rate limiter to prevent overwhelming the database
 */
class RateLimiter {
  private requests: number[] = [];
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  async throttle(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      
      console.warn('[RATE_LIMITER] Rate limit reached, waiting', waitTime, 'ms');
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.throttle(); // Try again
    }
    
    this.requests.push(now);
  }
}

export const rateLimiter = new RateLimiter(100, 60000);

/**
 * Error logger with context
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, any>
) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  console.error(`[ERROR] ${context}:`, {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  });
}

/**
 * Timeout wrapper to prevent hanging requests
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 30000,
  errorMessage = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ]);
}
