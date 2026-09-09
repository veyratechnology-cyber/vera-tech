import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getHealthStatus } from '@/lib/monitoring';

/**
 * Health Check Endpoint
 * Monitor site health and detect issues early
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy' as 'healthy' | 'degraded' | 'unhealthy',
    checks: {
      database: false,
      memory: false,
      uptime: 0,
    },
    details: {} as Record<string, any>,
  };

  // Check database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = true;
  } catch (error) {
    checks.checks.database = false;
    checks.status = 'unhealthy';
    checks.details.database_error = error instanceof Error ? error.message : String(error);
  }

  // Check memory usage
  if (typeof process !== 'undefined') {
    const usage = process.memoryUsage();
    const heapUsedMB = Math.round(usage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(usage.heapTotal / 1024 / 1024);
    const heapUsagePercent = (heapUsedMB / heapTotalMB) * 100;

    checks.checks.memory = heapUsagePercent < 90;
    checks.details.memory = {
      heapUsedMB,
      heapTotalMB,
      heapUsagePercent: Math.round(heapUsagePercent),
    };

    if (heapUsagePercent >= 90) {
      checks.status = 'degraded';
    }

    checks.checks.uptime = process.uptime();
  } else {
    checks.checks.memory = true; // Can't check in Edge Runtime
  }

  // Get monitoring data
  try {
    checks.details.monitoring = getHealthStatus();
  } catch (error) {
    // Silent fail on monitoring
  }

  return NextResponse.json(checks, {
    status: checks.status === 'healthy' ? 200 : checks.status === 'degraded' ? 200 : 503,
  });
}
