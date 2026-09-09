// @ts-nocheck
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Calendar } from "lucide-react";
import ConsultationFilters from "./ConsultationFilters";
import { getConsultations } from "@/lib/admin/data-fetchers";
import { ErrorFallback } from "@/components/admin/ErrorBoundary";

export const metadata = {
  title: "Consultations | VeyraTech Admin",
};

// Enable dynamic rendering for filters
export const dynamic = "force-dynamic";

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
  const { data, error } = await getConsultations({
    ...searchParams,
    cache: false, // Disable cache for filtered results
  });

  const { consultations, stats } = data;

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
        <ErrorFallback
          error={error}
          title="Error loading consultations"
          description="The consultations table may not exist yet. Please run the database migrations."
        />
      ) : (
        <>
          {/* Stats Cards */}
          {stats.length > 0 && (
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
          )}

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
