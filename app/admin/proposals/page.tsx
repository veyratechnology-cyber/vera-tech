import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, FileText, Search } from "lucide-react";

export const metadata = {
  title: "Proposals | VeyraTech Admin",
};

export default async function ProposalsPage() {
  const proposals = await prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      lead: {
        select: { name: true, company: true },
      },
      assignedAdmin: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Proposals
          </h1>
          <p className="text-text-secondary">
            Create and manage client proposals
          </p>
        </div>
        <Link href="/admin/proposals/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            Create Proposal
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              size={20}
            />
            <input
              type="text"
              placeholder="Search proposals..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Proposals ({proposals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {proposals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Created By</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Created</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((proposal) => (
                    <tr
                      key={proposal.id}
                      className="border-b border-border hover:bg-primary"
                    >
                      <td className="py-3 px-4 font-medium">{proposal.title}</td>
                      <td className="py-3 px-4">
                        {proposal.lead?.name} ({proposal.lead?.company})
                      </td>
                      <td className="py-3 px-4 text-sm">{proposal.assignedAdmin?.name || "Unassigned"}</td>
                      <td className="py-3 px-4">
                        <Badge variant="info">{proposal.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(proposal.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/proposals/${proposal.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto text-text-muted mb-4" size={48} />
              <p className="text-text-muted mb-4">No proposals yet</p>
              <Link href="/admin/proposals/new">
                <Button variant="primary" size="md">
                  <Plus size={20} />
                  Create Your First Proposal
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
