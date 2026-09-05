// @ts-nocheck
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, Briefcase, Search } from "lucide-react";

export const metadata = {
  title: "Projects | VeyraTech Admin",
};

export default async function ProjectsPage() {
  let projects = [];
  let error = null;

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        proposal: {
          select: { 
            title: true, 
            clientCompany: true,
            lead: {
              select: { name: true }
            }
          },
        },
        assignedAdmin: {
          select: { name: true },
        },
      },
    });
  } catch (e: any) {
    console.error("Error loading projects:", e);
    error = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Projects
          </h1>
          <p className="text-text-secondary">
            Manage active and completed projects
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            New Project
          </Button>
        </Link>
      </div>

      {error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading projects</p>
              <p className="text-sm text-text-muted">{error}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Projects ({projects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">PM</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Stage</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Start Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-border hover:bg-primary"
                    >
                      <td className="py-3 px-4 font-medium">{project.name}</td>
                      <td className="py-3 px-4">
                        {project.proposal?.lead?.name || "N/A"} ({project.proposal?.clientCompany || project.company})
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {project.assignedAdmin?.name || "Unassigned"}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="success">{project.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="info">{project.currentStage}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : "Not set"}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/projects/${project.id}`}>
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
              <Briefcase className="mx-auto text-text-muted mb-4" size={48} />
              <p className="text-text-muted mb-4">No projects yet</p>
              <Link href="/admin/projects/new">
                <Button variant="primary" size="md">
                  <Plus size={20} />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
        </>
      )}
    </div>
  );
}
