// @ts-nocheck
// Test endpoint to diagnose auth issues
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const result = {
      step: "",
      success: false,
      error: null,
      details: {}
    };

    // Step 1: Can we connect to database?
    result.step = "database_connection";
    try {
      await prisma.$connect();
      result.details.database_connected = true;
    } catch (e: any) {
      result.details.database_connected = false;
      result.error = `Database connection failed: ${e.message}`;
      return NextResponse.json(result, { status: 500 });
    }

    // Step 2: Can we find the admin user?
    result.step = "find_admin";
    let admin;
    try {
      admin = await prisma.admin.findUnique({
        where: { email: email?.toLowerCase() || "admin@veyratech.com" }
      });
      result.details.admin_found = !!admin;
      result.details.admin_status = admin?.status;
      result.details.admin_email = admin?.email;
    } catch (e: any) {
      result.details.admin_found = false;
      result.error = `Query failed: ${e.message}`;
      return NextResponse.json(result, { status: 500 });
    }

    if (!admin) {
      result.error = "Admin user not found in database";
      return NextResponse.json(result, { status: 404 });
    }

    // Step 3: Can we verify password?
    result.step = "password_check";
    if (password) {
      try {
        const isValid = await compare(password, admin.passwordHash);
        result.details.password_valid = isValid;
        result.details.password_hash_sample = admin.passwordHash.substring(0, 20) + "...";
      } catch (e: any) {
        result.error = `Password check failed: ${e.message}`;
        return NextResponse.json(result, { status: 500 });
      }
    }

    result.success = true;
    result.step = "complete";
    
    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      step: "unknown",
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
