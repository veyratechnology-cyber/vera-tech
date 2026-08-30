"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  FileText,
  Briefcase,
  BarChart3,
  Settings,
  Package,
  Building2,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: <Users size={20} />,
  },
  {
    label: "Prospects",
    href: "/admin/prospects",
    icon: <UserPlus size={20} />,
  },
  {
    label: "Consultations",
    href: "/admin/consultations",
    icon: <Calendar size={20} />,
  },
  {
    label: "Contact Messages",
    href: "/admin/contact-messages",
    icon: <MessageSquare size={20} />,
  },
  {
    label: "Proposals",
    href: "/admin/proposals",
    icon: <FileText size={20} />,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: <Briefcase size={20} />,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 size={20} />,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: <Package size={20} />,
  },
  {
    label: "Industries",
    href: "/admin/industries",
    icon: <Building2 size={20} />,
  },
  {
    label: "Insights",
    href: "/admin/insights",
    icon: <BookOpen size={20} />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-primary-dark text-text-primary border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin">
          <Logo variant="full" theme="dark" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(item.href)
                    ? "bg-secondary text-text-primary"
                    : "text-text-secondary hover:bg-primary hover:text-text-primary"
                )}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-secondary text-text-primary text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} VeyraTech
        </p>
      </div>
    </aside>
  );
}
