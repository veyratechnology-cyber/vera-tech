// @ts-nocheck
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/shared";
import {
  Users,
  UserPlus,
  Calendar,
  FileText,
  TrendingUp,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export const metadata = {
  title: "Dashboard | VeyraTech Admin",
};

async function getDashboardStats() {
  try {
    const [
      totalLeads,
      newLeadsThisMonth,
      totalProspects,
      pendingConsultations,
      activeProposals,
      activeProjects,
    ] = await Promise.all([
      prisma.lead.count().catch(e => { console.error("[COUNT] lead error:", e.message); return 0; }),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(1)),
          },
        },
      }).catch(e => { console.error("[COUNT] new leads error:", e.message); return 0; }),
      prisma.prospect.count().catch(e => { console.error("[COUNT] prospect error:", e.message); return 0; }),
      prisma.consultation.count({
        where: {
          status: {
            in: ["NEW", "REVIEWING", "CONTACTED", "SCHEDULED"],
          },
        },
      }).catch(e => { console.error("[COUNT] consultation error:", e.message); return 0; }),
      prisma.proposal.count({
        where: {
          status: {
            in: ["DRAFT", "SENT", "VIEWED"],
          },
        },
      }).catch(e => { console.error("[COUNT] proposal error:", e.message); return 0; }),
      prisma.project.count({
        where: {
          status: "ACTIVE",
        },
      }).catch(e => { console.error("[COUNT] project error:", e.message); return 0; }),
    ]);

    return {
      totalLeads,
      newLeadsThisMonth,
      totalProspects,
      pendingConsultations,
      activeProposals,
      activeProjects,
    };
  } catch (error: any) {
    console.error("[getDashboardStats] Error:", error.message);
    throw error;
  }
}

async function getRecentLeads() {
  try {
    return await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        company: true,
        email: true,
        status: true,
        createdAt: true,
      },
    });
  } catch (error: any) {
    console.error("[getRecentLeads] Error:", error.message);
    return [];
  }
}

async function getRecentConsultations() {
  try {
    return await prisma.consultation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        company: true,
        email: true,
        status: true,
        preferredDate: true,
        createdAt: true,
      },
    });
  } catch (error: any) {
    console.error("[getRecentConsultations] Error:", error.message);
    return [];
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentLeads = await getRecentLeads();
  const recentConsultations = await getRecentConsultations();

  const statCards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      subtitle: `+${stats.newLeadsThisMonth} this month`,
      icon: <Users size={24} />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/admin/leads",
    },
    {
      title: "Prospects",
      value: stats.totalProspects,
      subtitle: "Active prospects",
      icon: <UserPlus size={24} />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/admin/prospects",
    },
    {
      title: "Consultations",
      value: stats.pendingConsultations,
      subtitle: "Pending review",
      icon: <Calendar size={24} />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/admin/consultations",
    },
    {
      title: "Active Proposals",
      value: stats.activeProposals,
      subtitle: "In progress",
      icon: <FileText size={24} />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/admin/proposals",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      subtitle: "Ongoing work",
      icon: <Briefcase size={24} />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      href: "/admin/projects",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
          Dashboard Overview
        </h1>
        <p className="text-text-secondary">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card hover className="cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <h3 className="text-sm font-medium text-text-secondary mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted">{stat.subtitle}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Link href="/admin/leads">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/admin/leads/${lead.id}`}
                    className="block p-4 rounded-lg hover:bg-primary transition-colors border border-border"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {lead.name}
                        </h4>
                        <p className="text-sm text-text-secondary">{lead.company}</p>
                        <p className="text-xs text-text-muted mt-1">{lead.email}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {lead.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-8">No leads yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Consultations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Consultations</CardTitle>
              <Link href="/admin/consultations">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentConsultations.length > 0 ? (
              <div className="space-y-4">
                {recentConsultations.map((consultation) => (
                  <Link
                    key={consultation.id}
                    href={`/admin/consultations/${consultation.id}`}
                    className="block p-4 rounded-lg hover:bg-primary transition-colors border border-border"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {consultation.name}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {consultation.company}
                        </p>
                        {consultation.preferredDate && (
                          <p className="text-xs text-text-muted mt-1">
                            Preferred: {new Date(consultation.preferredDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {consultation.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-8">
                No consultation requests yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/leads/new">
              <Button variant="outline" size="lg" className="w-full">
                <Users size={20} />
                Add Lead
              </Button>
            </Link>
            <Link href="/admin/prospects/new">
              <Button variant="outline" size="lg" className="w-full">
                <UserPlus size={20} />
                Add Prospect
              </Button>
            </Link>
            <Link href="/admin/proposals/new">
              <Button variant="outline" size="lg" className="w-full">
                <FileText size={20} />
                Create Proposal
              </Button>
            </Link>
            <Link href="/admin/projects/new">
              <Button variant="outline" size="lg" className="w-full">
                <Briefcase size={20} />
                New Project
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
