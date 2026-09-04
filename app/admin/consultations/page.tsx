import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Calendar, Search, Filter } from "lucide-react";
import ConsultationFilters from "./ConsultationFilters";

export const metadata = {
  title: "Consultations | VeyraTech Admin",
};

interface PageProps {
  searchParams: {
    status?: string;
    meetingType?: string;
    industry?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  };
}

export default async function ConsultationsPage({ searchParams }: PageProps) {
  let consultations: any[] = [];
  let stats: any[] = [];
  let error = null;

  try {
    // Build where clause based on filters
    const where: any = {};
    
    if (searchParams.status) {
      where.status = searchParams.status;
    }
    
    if (searchParams.meetingType) {
      where.meetingType = searchParams.meetingType;
    }
    
    if (searchParams.industry) {
      where.industry = searchParams.industry;
    }
    
    if (searchParams.dateFrom || searchParams.dateTo) {
      where.actualScheduledAt = {};
      if (searchParams.dateFrom) {
        where.actualScheduledAt.gte = new Date(searchParams.dateFrom);
      }
      if (searchParams.dateTo) {
        where.actualScheduledAt.lte = new Date(searchParams.dateTo);
      }
    }
    
    if (searchParams.search) {
      where.OR = [
        { name: { contains: searchParams.search, mode: 'insensitive' } },
        { email: { contains: searchParams.search, mode: 'insensitive' } },
        { company: { contains: searchParams.search, mode: 'insensitive' } },
        { phone: { contains: searchParams.search, mode: 'insensitive' } },
      ];
    }

    consultations = await prisma.consultation.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    
    // Get counts for stats
    stats = await prisma.consultation.groupBy({
      by: ['status'],
      _count: true,
    });
  } catch (e: any) {
    console.error("Error loading consultations:", e);
    error = e.message;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
          Consultation Requests
        </h1>
        <p className="text-text-secondary">
          Manage incoming consultation requests
        </p>
      </div>
      
      {error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading consultations</p>
              <p className="text-sm text-text-muted">{error}</p>
              <p className="text-sm text-text-muted mt-4">
                The consultations table may not exist yet. Please run the database migrations.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.status}>
                <CardContent className="p-4">
                  <p className="text-sm text-text-muted">{stat.status}</p>
                  <p className="text-2xl font-bold text-text-primary">{stat._count}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <ConsultationFilters />

          <Card>
            <CardHeader>
              <CardTitle>All Consultations ({consultations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {consultations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Company</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Industry</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Meeting Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Scheduled</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultations.map((consultation) => (
                        <tr
                          key={consultation.id}
                          className="border-b border-border hover:bg-primary"
                        >
                          <td className="py-3 px-4 font-medium">{consultation.name}</td>
                          <td className="py-3 px-4">{consultation.company || "-"}</td>
                          <td className="py-3 px-4 text-sm">
                            {consultation.industry?.replace(/_/g, " ") || "-"}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {consultation.meetingType?.replace(/_/g, " ") || "-"}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {consultation.actualScheduledAt
                              ? new Date(consultation.actualScheduledAt).toLocaleDateString()
                              : consultation.preferredDate
                              ? new Date(consultation.preferredDate).toLocaleDateString()
                              : "Not scheduled"}
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                consultation.status === "SCHEDULED" ? "success" :
                                consultation.status === "NEW" ? "warning" : "default"
                              }
                            >
                              {consultation.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Link href={`/admin/consultations/${consultation.id}`}>
                              <Button variant="outline" size="sm">View Details</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="mx-auto text-text-muted mb-4" size={48} />
                  <p className="text-text-muted">No consultations match your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
