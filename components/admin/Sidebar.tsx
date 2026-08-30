"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/shared";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Briefcase,
  FileText,
  Mail,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const iconMap: { [key: string]: any } = {
  LayoutDashboard,
  Users,
  TrendingUp,
  Briefcase,
  FileText,
  Mail,
  BarChart3,
  Settings,
  Shield,
};

interface SidebarProps {
  adminName: string;
}

export function Sidebar({ adminName }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin" && pathname === "/admin") return true;
    if (href !== "/admin" && pathname.startsWith(href)) return true;
    return false;
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin-login" });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-dark">
        <Logo variant="full" theme="dark" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        {ADMIN_NAV_ITEMS.map((item: any) => {
          const Icon = iconMap[item.icon];
          const hasChildren = item.children && Array.isArray(item.children) && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);
          const isItemActive = item.href ? isActive(item.href) : false;

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-primary-dark transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} />}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {isExpanded && item.children && (
                  <div className="bg-primary-dark/50">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block pl-14 pr-6 py-2 text-sm hover:bg-primary-dark transition-colors",
                          isActive(child.href) && "bg-secondary font-medium"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 hover:bg-primary-dark transition-colors",
                  isItemActive && "bg-secondary font-medium"
                )}
              >
                {Icon && <Icon size={20} />}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          }

          return null;
        })}
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-primary-dark">
        <div className="mb-3">
          <p className="text-sm text-text-muted">Signed in as</p>
          <p className="font-medium truncate">{adminName}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 bg-primary-dark hover:bg-secondary rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
