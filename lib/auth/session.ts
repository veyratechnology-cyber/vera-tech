import { getServerSession } from "next-auth/next";
import { authOptions } from "./config";
import { redirect } from "next/navigation";

/**
 * Get current admin session
 * Server-side only
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Require authenticated admin session
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session || !session.user) {
    redirect("/admin-login");
  }
  
  return session;
}

/**
 * Get current admin ID
 */
export async function getCurrentAdminId() {
  const session = await requireAuth();
  return session.user.id;
}
