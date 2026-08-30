import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { ArrowLeft, Calendar } from "lucide-react";
import { PROPOSAL_STATUSES } from "@/lib/constants";

export const metadata = {
  title: "Proposal Details | VeyraTech Admin",
};

async function getProposal(id: string) {
  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: {
      lead: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignedAdmin: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!proposal) {
    notFound();
  }

  return proposal;
}

export default async function ProposalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const proposal = await getProposal(params.id);

  const getStatusColor = (status: string) => {
    const statusConfig = PROPOSAL_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || "default";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/proposals">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-sora font-bold text-text-primary">
              {proposal.title}
            </h1>
            <p className="text-text-secondary">{proposal.clientCompany}</p>
          </div>
        </div>
        <Badge variant={getStatusColor(proposal.status) as any}>
          {proposal.status}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {proposal.problem}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {proposal.objectives}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scope</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {proposal.scope}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {proposal.deliverables}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {proposal.timeline}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {proposal.investment}
              </p>
            </CardContent>
          </Card>

          {proposal.terms && (
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-primary whitespace-pre-wrap">
                  {proposal.terms}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-text-secondary">
                  Created
                </label>
                <p className="text-text-primary">
                  {new Date(proposal.createdAt).toLocaleDateString()}
                </p>
              </div>
              {proposal.sentAt && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">
                    Sent
                  </label>
                  <p className="text-text-primary">
                    {new Date(proposal.sentAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              {proposal.viewedAt && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">
                    Viewed
                  </label>
                  <p className="text-text-primary">
                    {new Date(proposal.viewedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              {proposal.expirationDate && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">
                    Expires
                  </label>
                  <p className="text-text-primary">
                    {new Date(proposal.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assignment */}
          {proposal.assignedAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Assigned To</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-primary font-medium">
                  {proposal.assignedAdmin.name}
                </p>
                <p className="text-sm text-text-muted">
                  {proposal.assignedAdmin.email}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Linked Lead */}
          {proposal.lead && (
            <Card>
              <CardHeader>
                <CardTitle>Linked Lead</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/admin/leads/${proposal.lead.id}`}
                  className="text-secondary hover:underline"
                >
                  {proposal.lead.name}
                </Link>
                <p className="text-sm text-text-muted">{proposal.lead.email}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
