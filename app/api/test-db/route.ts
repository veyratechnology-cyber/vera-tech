import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connected successfully",
      result,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlPreview: process.env.DATABASE_URL?.substring(0, 30) + "..."
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    }, { status: 500 });
  }
}
