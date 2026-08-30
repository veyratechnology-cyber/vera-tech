import React from "react";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <div className="bg-primary-dark border-b border-border px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {actions}
          <button className="relative p-2 hover:bg-primary-dark rounded-lg transition-colors">
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
