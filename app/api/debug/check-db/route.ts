// DEBUG ENDPOINT - Check database connection and data
// Visit: https://vera-tech.vercel.app/api/debug/check-db

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      database: process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] || "unknown",
      checks: {},
    };

    // Check 1: Database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      results.checks.connection = "✅ Connected";
    } catch (error) {
      results.checks.connection = `❌ Failed: ${error}`;
      return NextResponse.json(results, { status: 500 });
    }

    // Check 2: Services table exists
    try {
      const servicesCount = await prisma.service.count();
      results.checks.servicesTable = `✅ Exists (${servicesCount} records)`;
      results.servicesCount = servicesCount;
    } catch (error) {
      results.checks.servicesTable = `❌ Error: ${error}`;
    }

    // Check 3: Industry pages table exists
    try {
      const industriesCount = await prisma.industryPage.count();
      results.checks.industryPagesTable = `✅ Exists (${industriesCount} records)`;
      results.industriesCount = industriesCount;
    } catch (error) {
      results.checks.industryPagesTable = `❌ Error: ${error}`;
    }

    // Check 4: List actual services
    try {
      const services = await prisma.service.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          published: true,
        },
        orderBy: { displayOrder: "asc" },
      });
      results.services = services;
    } catch (error) {
      results.services = `❌ Error: ${error}`;
    }

    // Check 5: List actual industries
    try {
      const industries = await prisma.industryPage.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          published: true,
        },
        orderBy: { displayOrder: "asc" },
      });
      results.industries = industries;
    } catch (error) {
      results.industries = `❌ Error: ${error}`;
    }

    // Check 6: Try to fetch a specific service
    try {
      const cloudService = await prisma.service.findUnique({
        where: { slug: "cloud-solutions" },
      });
      results.checks.cloudSolutionsPage = cloudService
        ? `✅ Found: ${cloudService.name}`
        : "❌ Not found in database";
    } catch (error) {
      results.checks.cloudSolutionsPage = `❌ Error: ${error}`;
    }

    // Check 7: Database schema info
    try {
      const tables: any = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('services', 'industry_pages')
      `;
      results.checks.tablesInSchema = tables.length > 0 ? `✅ Found ${tables.length} tables` : "❌ Tables missing";
      results.tablesFound = tables;
    } catch (error) {
      results.checks.tablesInSchema = `❌ Error: ${error}`;
    }

    return NextResponse.json(results, { 
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Debug check failed",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
