import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, Edit, Eye } from "lucide-react";

export const metadata = {
  title: "Insights | VeyraTech Admin",
};

export default async function InsightsAdminPage() {
  const insights = await prisma.insight.findMany({
    orderBy: { publishedAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Insights & Blog
          </h1>
          <p className="text-text-secondary">
            Manage blog posts and thought leadership content
          </p>
        </div>
        <Link href="/admin/insights/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts ({insights.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:border-secondary transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-text-primary mb-1">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                      {insight.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <Badge
                        variant={
                          insight.status === "PUBLISHED" ? "success" : "default"
                        }
                      >
                        {insight.status}
                      </Badge>
                      <span>by {insight.author.name}</span>
                      <span>
                        {insight.publishedAt
                          ? new Date(insight.publishedAt).toLocaleDateString()
                          : "Not published"}
                      </span>
                      <Badge variant="info">{insight.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {insight.status === "PUBLISHED" && (
                      <Link href={`/insights/${insight.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye size={16} />
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/insights/${insight.id}`}>
                      <Button variant="primary" size="sm">
                        <Edit size={16} />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted mb-4">No insights yet</p>
              <Link href="/admin/insights/new">
                <Button variant="primary" size="md">
                  <Plus size={20} />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
