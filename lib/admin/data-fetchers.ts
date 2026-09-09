import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * Optimized data fetchers for admin pages
 * Uses Next.js caching for improved performance
 */

// Cache tags for revalidation
export const CACHE_TAGS = {
  consultations: "consultations",
  projects: "projects",
  leads: "leads",
  contactMessages: "contact-messages",
  dashboard: "dashboard",
} as const;

/**
 * Safe wrapper for database queries
 * Returns data and error separately to prevent crashes
 */
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<{ data: T; error: string | null }> {
  try {
    const data = await queryFn();
    return { data, error: null };
  } catch (error) {
    console.error("Database query error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { data: fallback, error: errorMessage };
  }
}

/**
 * Fetch consultations with optional caching
 */
export async function getConsultations(options?: {
  status?: string;
  meetingType?: string;
  industry?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  cache?: boolean;
}) {
  const fetchFn = async () => {
    const where: any = {};

    if (options?.status) where.status = options.status;
    if (options?.meetingType) where.meetingType = options.meetingType;
    if (options?.industry) where.industry = options.industry;

    if (options?.dateFrom || options?.dateTo) {
      where.actualScheduledAt = {};
      if (options.dateFrom) where.actualScheduledAt.gte = new Date(options.dateFrom);
      if (options.dateTo) where.actualScheduledAt.lte = new Date(options.dateTo);
    }

    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: "insensitive" } },
        { email: { contains: options.search, mode: "insensitive" } },
        { company: { contains: options.search, mode: "insensitive" } },
        { phone: { contains: options.search, mode: "insensitive" } },
      ];
    }

    const [consultations, stats] = await Promise.all([
      prisma.consultation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100, // Limit for performance
      }),
      prisma.consultation.groupBy({
        by: ["status"],
        _count: {
          _all: true,
        },
      }),
    ]);

    return { consultations, stats };
  };

  if (options?.cache !== false) {
    const cached = unstable_cache(fetchFn, ["consultations"], {
      tags: [CACHE_TAGS.consultations],
      revalidate: 60, // Revalidate every 60 seconds
    });
    return safeQuery(cached, { consultations: [], stats: [] });
  }

  return safeQuery(fetchFn, { consultations: [], stats: [] });
}

/**
 * Fetch projects with relations
 */
export async function getProjects(cache = true) {
  const fetchFn = async () => {
    return prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        proposal: {
          select: {
            title: true,
            clientCompany: true,
            lead: {
              select: { name: true },
            },
          },
        },
        assignedAdmin: {
          select: { name: true },
        },
      },
    });
  };

  if (cache) {
    const cached = unstable_cache(fetchFn, ["projects"], {
      tags: [CACHE_TAGS.projects],
      revalidate: 60,
    });
    return safeQuery(cached, []);
  }

  return safeQuery(fetchFn, []);
}

/**
 * Fetch contact messages
 */
export async function getContactMessages(cache = true) {
  const fetchFn = async () => {
    return prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  };

  if (cache) {
    const cached = unstable_cache(fetchFn, ["contact-messages"], {
      tags: [CACHE_TAGS.contactMessages],
      revalidate: 60,
    });
    return safeQuery(cached, []);
  }

  return safeQuery(fetchFn, []);
}

/**
 * Fetch dashboard statistics
 */
export async function getDashboardStats(cache = true) {
  const fetchFn = async () => {
    const [
      totalLeads,
      totalConsultations,
      totalProjects,
      activeProjects,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.consultation.count(),
      prisma.project.count(),
      prisma.project.count({ where: { status: "ACTIVE" } }),
    ]);

    return {
      totalLeads,
      totalConsultations,
      totalProjects,
      activeProjects,
    };
  };

  if (cache) {
    const cached = unstable_cache(fetchFn, ["dashboard-stats"], {
      tags: [CACHE_TAGS.dashboard],
      revalidate: 300, // 5 minutes
    });
    return safeQuery(cached, {
      totalLeads: 0,
      totalConsultations: 0,
      totalProjects: 0,
      activeProjects: 0,
    });
  }

  return safeQuery(fetchFn, {
    totalLeads: 0,
    totalConsultations: 0,
    totalProjects: 0,
    activeProjects: 0,
  });
}
