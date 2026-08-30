import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Database Query Functions
 * Reusable queries for fetching data
 */

// Insights Queries
export async function getPublishedInsights({
  category,
  page = 1,
  pageSize = 12,
}: {
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const skip = (page - 1) * pageSize;

  const where: Prisma.InsightWhereInput = {
    status: "PUBLISHED",
    ...(category && { category: category as any }),
  };

  const [data, total] = await Promise.all([
    prisma.insight.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { publishedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.insight.count({ where }),
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}

export async function getPublishedInsightBySlug(slug: string) {
  return prisma.insight.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getRecentInsights(limit: number = 3) {
  return prisma.insight.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Service Queries
export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
  });
}

// Industry Queries
export async function getPublishedIndustries() {
  return prisma.industryPage.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getIndustryBySlug(slug: string) {
  return prisma.industryPage.findUnique({
    where: { slug },
  });
}
