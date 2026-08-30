import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";

export const metadata = {
  title: "Services | VeyraTech Admin",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Services
          </h1>
          <p className="text-text-secondary">
            Manage your service offerings
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            Add Service
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-secondary transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {service.published ? (
                      <Eye className="text-green-500" size={20} />
                    ) : (
                      <EyeOff className="text-text-muted" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-text-primary">
                      {service.name}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={service.published ? "success" : "default"}>
                        {service.published ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        /{service.slug}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/services/${service.slug}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                      Preview
                    </Button>
                  </Link>
                  <Link href={`/admin/services/${service.id}`}>
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
