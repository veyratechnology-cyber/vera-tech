import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, Search, Filter } from "lucide-react";
import { LEAD_STATUSES } from "@/lib/constants";

export const metadata = {
  title: "Leads | VeyraTech Admin",
};

async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedAdmin: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export default async function LeadsPage() {
  const leads = await getLeads();

  const getStatusColor = (status: string) => {
    const statusConfig = LEAD_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || "default";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Leads
          </h1>
          <p className="text-text-secondary">
            Manage and track all incoming leads
          </p>
        </div>
        <Link href="/admin/leads/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            Add Lead
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
            <Button variant="outline" size="md">
              <Filter size={20} />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({leads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Company
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Source
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Created
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border hover:bg-primary transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-text-primary">{lead.name}</p>
                          {lead.assignedAdmin && (
                            <p className="text-xs text-text-muted">
                              Assigned to: {lead.assignedAdmin.name}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-primary">{lead.company}</td>
                      <td className="py-3 px-4 text-text-primary">{lead.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">
                          {lead.leadSource}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(lead.status) as any}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-primary text-sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/leads/${lead.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted mb-4">No leads yet</p>
              <Link href="/admin/leads/new">
                <Button variant="primary" size="md">
                  <Plus size={20} />
                  Add Your First Lead
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
