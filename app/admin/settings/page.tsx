import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/shared";
import { Settings as SettingsIcon, User, Building2, Mail, Shield } from "lucide-react";

export const metadata = {
  title: "Settings | VeyraTech Admin",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-text-secondary">
          Manage your account and system configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="text-blue-600" size={20} />
              </div>
              <CardTitle>Profile Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="your@email.com"
              />
            </div>
            <Button variant="primary" size="md">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Building2 className="text-green-600" size={20} />
              </div>
              <CardTitle>Company Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                defaultValue="VeyraTech"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contact Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                defaultValue="contact@VeyraTech.com"
              />
            </div>
            <Button variant="primary" size="md">
              Update Information
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Shield className="text-red-600" size={20} />
              </div>
              <CardTitle>Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <Button variant="primary" size="md">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Mail className="text-purple-600" size={20} />
              </div>
              <CardTitle>Email Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">New Leads</p>
                <p className="text-sm text-text-secondary">Get notified when new leads arrive</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Consultations</p>
                <p className="text-sm text-text-secondary">New consultation requests</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Proposals</p>
                <p className="text-sm text-text-secondary">Proposal status updates</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <Button variant="primary" size="md">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
