import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  className?: string;
}

/**
 * Reusable Badge Component
 * VeyraTech Brand Design - Navy + Orange
 */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-primary-dark text-text-secondary border border-border",
    primary: "bg-secondary/10 text-secondary border border-secondary/25",
    success: "bg-success/10 text-success border border-success/25",
    warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/25",
    error: "bg-red-500/10 text-red-500 border border-red-500/25",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
