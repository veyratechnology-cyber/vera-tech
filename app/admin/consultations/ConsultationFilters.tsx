"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, Button } from "@/components/shared";
import { Search, Filter, X } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";

export default function ConsultationFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [meetingType, setMeetingType] = useState(searchParams.get("meetingType") || "");
  const [industry, setIndustry] = useState(searchParams.get("industry") || "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") || "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (meetingType) params.set("meetingType", meetingType);
    if (industry) params.set("industry", industry);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    
    router.push(`/admin/consultations?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setMeetingType("");
    setIndustry("");
    setDateFrom("");
    setDateTo("");
    router.push("/admin/consultations");
  };

  const hasActiveFilters = search || status || meetingType || industry || dateFrom || dateTo;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                placeholder="Search by name, email, company, or phone..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 bg-secondary text-white text-xs rounded-full">
                  {[search, status, meetingType, industry, dateFrom, dateTo].filter(Boolean).length}
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X size={18} />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="NO_SHOW">No Show</option>
                </select>
              </div>

              {/* Meeting Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Meeting Type
                </label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">All Types</option>
                  <option value="GOOGLE_MEET">Google Meet</option>
                  <option value="PHONE">Phone</option>
                  <option value="IN_PERSON">In Person</option>
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">All Industries</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date From Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Date To Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Apply Button */}
              <div className="flex items-end">
                <Button
                  variant="default"
                  onClick={applyFilters}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
