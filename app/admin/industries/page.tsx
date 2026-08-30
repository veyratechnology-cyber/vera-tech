import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";

export const metadata = {
  title: "Industries | VeyraTech Admin",
};

export default async function IndustriesAdminPage() {
  const industries = await prisma.industryPage.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Industries
          </h1>
          <p className="text-text-secondary">
            Manage industry solution pages
          </p>
        </div>
        <Link href="/admin/industries/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            Add Industry
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Industries ({industries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-secondary transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {industry.published ? (
                      <Eye className="text-green-500" size={20} />
                    ) : (
                      <EyeOff className="text-text-muted" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-text-primary">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-1">
                      {industry.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={industry.published ? "success" : "default"}>
                        {industry.published ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        /{industry.slug}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/industries/${industry.slug}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                      Preview
                    </Button>
                  </Link>
                  <Link href={`/admin/industries/${industry.id}`}>
                    <Button variant="primary" size="sm">
                      <Edit size={16} />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
