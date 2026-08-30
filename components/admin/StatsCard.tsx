import React from "react";
import { Card, CardContent } from "@/components/shared";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

export function StatsCard({ title, value, icon: Icon, trend, color = "blue" }: StatsCardProps) {
  const colorStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-text-secondary mb-1">{title}</p>
            <h3 className="text-3xl font-sora font-bold text-text-primary">
              {value}
            </h3>
            {trend && (
              <p className={`text-sm mt-2 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
            <Icon size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
