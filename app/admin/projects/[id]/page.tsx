import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { PROJECT_STATUSES } from "@/lib/constants";

export const metadata = {
  title: "Project Details | VeyraTech Admin",
};

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      proposal: {
        select: {
          id: true,
          title: true,
        },
      },
      assignedAdmin: {
        select: {
          name: true,
          email: true,
        },
      },
      milestones: {
        orderBy: { dueDate: "asc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return project;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  const getStatusColor = (status: string) => {
    const statusConfig = PROJECT_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || "default";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-sora font-bold text-text-primary">
              {project.name}
            </h1>
            <p className="text-text-secondary">{project.company}</p>
          </div>
        </div>
        <Badge variant={getStatusColor(project.status) as any}>
          {project.status}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary whitespace-pre-wrap">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-primary font-medium">
                    {project.progress}%
                  </span>
                  {project.currentStage && (
                    <Badge variant="default">
                      {project.currentStage.replace(/_/g, " ")}
                    </Badge>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          {project.milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`p-4 rounded-lg border ${
                        milestone.completedAt
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {milestone.completedAt && (
                              <CheckCircle
                                size={16}
                                className="text-green-600"
                              />
                            )}
                            <h4 className="font-semibold text-text-primary">
                              {milestone.title}
                            </h4>
                          </div>
                          {milestone.description && (
                            <p className="text-sm text-text-secondary mb-2">
                              {milestone.description}
                            </p>
                          )}
                          <div className="text-xs text-text-muted">
                            {milestone.dueDate && (
                              <span>
                                Due: {new Date(milestone.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            {milestone.completedAt && (
                              <span className="ml-4">
                                Completed:{" "}
                                {new Date(milestone.completedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Internal Notes */}
          {project.internalNotes && (
            <Card>
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-primary whitespace-pre-wrap">
                  {project.internalNotes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Service */}
          <Card>
            <CardHeader>
              <CardTitle>Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-primary">
                {project.service.replace(/_/g, " ")}
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.startDate && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">
                    Start Date
                  </label>
                  <p className="text-text-primary">
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {project.expectedCompletion && (
                <div>
                  <label className="text-sm font-medium text-text-secondary">
                    Expected Completion
                  </label>
                  <p className="text-text-primary">
                    {new Date(project.expectedCompletion).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-text-secondary">
                  Created
                </label>
                <p className="text-text-primary">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Assignment */}
          {project.assignedAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Assigned To</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-primary font-medium">
                  {project.assignedAdmin.name}
                </p>
                <p className="text-sm text-text-muted">
                  {project.assignedAdmin.email}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Linked Proposal */}
          {project.proposal && (
            <Card>
              <CardHeader>
                <CardTitle>Linked Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/admin/proposals/${project.proposal.id}`}
                  className="text-secondary hover:underline"
                >
                  {project.proposal.title}
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
