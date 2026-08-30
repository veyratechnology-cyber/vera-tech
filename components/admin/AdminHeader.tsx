"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/shared";
import { LogOut, User } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin-login" });
  };

  return (
    <header className="bg-primary-dark border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-text-primary">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <NotificationDropdown />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-secondary text-text-primary flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-text-primary">{user.name || "Admin"}</p>
                <p className="text-xs text-text-muted">{user.email}</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-primary-dark rounded-lg shadow-lg border border-border py-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-primary hover:text-secondary transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
