import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/shared";
import { Plus, Search } from "lucide-react";

export const metadata = {
  title: "Prospects | VeyraTech Admin",
};

export default async function ProspectsPage() {
  const prospects = await prisma.prospect.findMany({
    orderBy: { createdAt: "desc" },
    include: {
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
            Prospects
          </h1>
          <p className="text-text-secondary">
            Track and manage prospecting activities
          </p>
        </div>
        <Link href="/admin/prospects/new">
          <Button variant="primary" size="lg">
            <Plus size={20} />
            Add Prospect
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
              placeholder="Search prospects..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Prospects ({prospects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {prospects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Industry</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Created</th>
                    <th className="text-left py-3 px-4 font-semibold text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prospects.map((prospect) => (
                    <tr
                      key={prospect.id}
                      className="border-b border-border hover:bg-primary"
                    >
                      <td className="py-3 px-4 font-medium">{prospect.contactPerson}</td>
                      <td className="py-3 px-4">{prospect.company}</td>
                      <td className="py-3 px-4">{prospect.industry}</td>
                      <td className="py-3 px-4">
                        <Badge variant="info">{prospect.contactStatus}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(prospect.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/prospects/${prospect.id}`}>
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
              <p className="text-text-muted mb-4">No prospects yet</p>
              <Link href="/admin/prospects/new">
                <Button variant="primary" size="md">
                  <Plus size={20} />
                  Add Your First Prospect
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
