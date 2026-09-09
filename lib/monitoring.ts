/**
 * Application Monitoring and Error Tracking
 * Helps identify patterns in crashes and errors
 */

interface ErrorLog {
  timestamp: string;
  context: string;
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

class ErrorMonitor {
  private errors: ErrorLog[] = [];
  private readonly MAX_ERRORS = 100; // Keep last 100 errors in memory
  
  log(context: string, error: unknown, metadata?: Record<string, any>) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      context,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      metadata,
    };
    
    this.errors.push(errorLog);
    
    // Keep only recent errors
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.shift();
    }
    
    // Log to console
    console.error(`[MONITOR] ${context}:`, errorLog);
    
    // In production, you could send to external monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorLog);
    }
  }
  
  private async sendToMonitoringService(errorLog: ErrorLog) {
    try {
      // Example: Send to external service
      // await fetch('/api/monitoring/error', {
      //   method: 'POST',
      //   body: JSON.stringify(errorLog),
      // });
    } catch (error) {
      // Silent fail - don't crash monitoring
      console.error('[MONITOR] Failed to send error:', error);
    }
  }
  
  getRecentErrors(limit: number = 10): ErrorLog[] {
    return this.errors.slice(-limit);
  }
  
  getErrorsByContext(context: string): ErrorLog[] {
    return this.errors.filter(e => e.context === context);
  }
  
  getErrorStats() {
    const stats: Record<string, number> = {};
    
    this.errors.forEach(error => {
      stats[error.context] = (stats[error.context] || 0) + 1;
    });
    
    return stats;
  }
  
  clearErrors() {
    this.errors = [];
  }
}

export const errorMonitor = new ErrorMonitor();

/**
 * Performance monitoring
 */
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  
  track(operation: string, durationMs: number) {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    
    const durations = this.metrics.get(operation)!;
    durations.push(durationMs);
    
    // Keep only last 100 measurements
    if (durations.length > 100) {
      durations.shift();
    }
    
    // Log slow operations
    if (durationMs > 5000) {
      console.warn(`[PERFORMANCE] Slow operation: ${operation} took ${durationMs}ms`);
    }
  }
  
  getStats(operation: string) {
    const durations = this.metrics.get(operation) || [];
    if (durations.length === 0) return null;
    
    const sorted = [...durations].sort((a, b) => a - b);
    const sum = durations.reduce((a, b) => a + b, 0);
    
    return {
      count: durations.length,
      avg: sum / durations.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(durations.length * 0.5)],
      p95: sorted[Math.floor(durations.length * 0.95)],
      p99: sorted[Math.floor(durations.length * 0.99)],
    };
  }
  
  getAllStats() {
    const allStats: Record<string, any> = {};
    
    this.metrics.forEach((_, operation) => {
      allStats[operation] = this.getStats(operation);
    });
    
    return allStats;
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Helper to track async operation performance
 */
export async function trackPerformance<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  
  try {
    const result = await fn();
    const duration = Date.now() - start;
    performanceMonitor.track(operation, duration);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    performanceMonitor.track(operation, duration);
    errorMonitor.log(operation, error);
    throw error;
  }
}

/**
 * Memory monitoring
 */
export function logMemoryUsage(context: string) {
  if (typeof process === 'undefined') return;
  
  const usage = process.memoryUsage();
  const mb = (bytes: number) => Math.round(bytes / 1024 / 1024);
  
  console.log(`[MEMORY] ${context}:`, {
    rss: `${mb(usage.rss)}MB`,
    heapTotal: `${mb(usage.heapTotal)}MB`,
    heapUsed: `${mb(usage.heapUsed)}MB`,
    external: `${mb(usage.external)}MB`,
  });
}

/**
 * Health check endpoint data
 */
export function getHealthStatus() {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: typeof process !== 'undefined' ? process.uptime() : 0,
    errors: errorMonitor.getRecentErrors(5),
    errorStats: errorMonitor.getErrorStats(),
    performance: performanceMonitor.getAllStats(),
  };
}
