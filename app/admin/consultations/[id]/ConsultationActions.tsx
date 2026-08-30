"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared";
import { Edit, Trash2, CheckCircle, XCircle, Calendar, AlertCircle } from "lucide-react";

interface ConsultationActionsProps {
  consultation: any;
}

export default function ConsultationActions({ consultation }: ConsultationActionsProps) {
  const router = useRouter();
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reschedule form state
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");

  // Cancellation form state
  const [cancellationReason, setCancellationReason] = useState("");

  // Completion form state
  const [outcome, setOutcome] = useState("PROPOSAL_SENT");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");

  const handleReschedule = async () => {
    if (!rescheduleDate || !rescheduleTime) {
      setError("Please select both date and time");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newDateTime = new Date(`${rescheduleDate}T${rescheduleTime}`);
      
      const response = await fetch(`/api/consultations/${consultation.id}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newDateTime: newDateTime.toISOString(),
          reason: rescheduleReason,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to reschedule");
      }

      setShowRescheduleModal(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reschedule");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      setError("Please provide a cancellation reason");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/consultations/${consultation.id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: cancellationReason,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to cancel");
      }

      setShowCancelModal(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/consultations/${consultation.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          outcome,
          meetingNotes,
          followUpDate: followUpDate || null,
          followUpNotes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to mark as complete");
      }

      setShowCompleteModal(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete");
    } finally {
      setLoading(false);
    }
  };

  // Don't show actions for cancelled consultations
  if (consultation.status === "CANCELLED") {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {consultation.status === "SCHEDULED" && (
          <>
            <Button
              variant="outline"
              onClick={() => setShowRescheduleModal(true)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Reschedule
            </Button>
            
            <Button
              variant="default"
              onClick={() => setShowCompleteModal(true)}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </Button>
          </>
        )}

        {(consultation.status === "NEW" || consultation.status === "SCHEDULED") && (
          <Button
            variant="outline"
            onClick={() => setShowCancelModal(true)}
            className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
          >
            <XCircle className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-secondary" />
              Reschedule Consultation
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  New Time
                </label>
                <input
                  type="time"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Reason (Optional)
                </label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Why is this being rescheduled?"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRescheduleModal(false);
                  setError(null);
                }}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleReschedule}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Rescheduling..." : "Reschedule"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" />
              Cancel Consultation
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                This will cancel the consultation and notify the client. This action cannot be undone.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">
                Cancellation Reason *
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Please explain why this consultation is being cancelled..."
                required
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelModal(false);
                  setError(null);
                }}
                disabled={loading}
                className="flex-1"
              >
                Keep Consultation
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
              >
                {loading ? "Cancelling..." : "Cancel Consultation"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Mark Consultation Complete
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Outcome *
                </label>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="PROPOSAL_SENT">Proposal Sent</option>
                  <option value="PROJECT_STARTED">Project Started</option>
                  <option value="FOLLOW_UP_NEEDED">Follow-up Needed</option>
                  <option value="NOT_A_FIT">Not a Fit</option>
                  <option value="CLIENT_CANCELLED">Client Cancelled</option>
                  <option value="PENDING_DECISION">Pending Decision</option>
                  <option value="CONVERTED_TO_CLIENT">Converted to Client</option>
                  <option value="DECLINED">Declined</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Meeting Notes
                </label>
                <textarea
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Key discussion points, decisions made, action items..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-1">
                    Follow-up Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">
                  Follow-up Notes (Optional)
                </label>
                <textarea
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="What needs to happen next?"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCompleteModal(false);
                  setError(null);
                }}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleComplete}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Saving..." : "Mark Complete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
