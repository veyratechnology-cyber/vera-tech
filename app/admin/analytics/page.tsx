import React from "react";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/shared";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

export const metadata = {
  title: "Analytics | VeyraTech Admin",
};

async function getAnalytics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

  const [
    leadsByStatus,
    leadsBySource,
    consultationsByStatus,
    proposalsByStatus,
    recentLeadsTrend,
  ] = await Promise.all([
    prisma.lead.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.lead.groupBy({
      by: ["leadSource"],
      _count: true,
    }),
    prisma.consultation.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.proposal.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    }),
  ]);

  return {
    leadsByStatus,
    leadsBySource,
    consultationsByStatus,
    proposalsByStatus,
    recentLeadsTrend,
  };
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
          Analytics & Reports
        </h1>
        <p className="text-text-secondary">
          Track performance metrics and business insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">
              New Leads (30d)
            </h3>
            <p className="text-3xl font-bold text-text-primary">
              {analytics.recentLeadsTrend}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Target className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">
              Conversion Rate
            </h3>
            <p className="text-3xl font-bold text-text-primary">24%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">
              Pipeline Value
            </h3>
            <p className="text-3xl font-bold text-text-primary">$250K</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">
              Win Rate
            </h3>
            <p className="text-3xl font-bold text-text-primary">68%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.leadsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-text-primary">{item.status}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-border rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{
                          width: `${(item._count / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold text-text-primary w-8 text-right">
                      {item._count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.leadsBySource.map((item) => (
                <div key={item.leadSource} className="flex items-center justify-between">
                  <span className="text-text-primary">{item.leadSource}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-border rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{
                          width: `${(item._count / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold text-text-primary w-8 text-right">
                      {item._count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.consultationsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-text-primary">{item.status}</span>
                  <span className="font-semibold text-text-primary">{item._count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proposal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.proposalsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-text-primary">{item.status}</span>
                  <span className="font-semibold text-text-primary">{item._count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
