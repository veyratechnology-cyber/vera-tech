import React from "react";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/shared";
import { 
  Calendar, Clock, Mail, Phone, Building2, Globe, MapPin, 
  User, Briefcase, Target, MessageSquare, FileText, Video,
  Edit, Trash2, CheckCircle, XCircle, AlertCircle 
} from "lucide-react";
import { format } from "date-fns";
import ConsultationActions from "./ConsultationActions";

export const metadata = {
  title: "Consultation Details | VeyraTech Admin",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ConsultationDetailPage({ params }: PageProps) {
  const consultation = await prisma.consultation.findUnique({
    where: { id: params.id },
    include: {
      reminders: {
        orderBy: { scheduledFor: "desc" },
      },
      history: {
        orderBy: { timestamp: "desc" },
      },
    },
  });

  if (!consultation) {
    notFound();
  }

  // Format dates safely
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Not set";
    try {
      return format(new Date(date), "PPP 'at' p");
    } catch {
      return "Invalid date";
    }
  };

  const formatShortDate = (date: Date | null | undefined) => {
    if (!date) return "Not set";
    try {
      return format(new Date(date), "PP");
    } catch {
      return "Invalid date";
    }
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
    const variants: Record<string, "success" | "warning" | "default"> = {
      SCHEDULED: "success",
      NEW: "warning",
      COMPLETED: "success",
      CANCELLED: "default",
      NO_SHOW: "default",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  // Meeting type icon
  const getMeetingTypeIcon = (type: string | null) => {
    switch (type) {
      case "GOOGLE_MEET":
        return <Video className="w-4 h-4" />;
      case "PHONE":
        return <Phone className="w-4 h-4" />;
      case "IN_PERSON":
        return <MapPin className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
            Consultation Details
          </h1>
          <p className="text-text-secondary">
            ID: {consultation.id}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(consultation.status)}
        </div>
      </div>

      {/* Action Buttons */}
      <ConsultationActions consultation={consultation} />

      {/* Meeting Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Meeting Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Preferred Date & Time
            </label>
            <p className="text-text-primary flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-muted" />
              {formatDate(consultation.preferredDate)}
            </p>
          </div>

          {consultation.actualScheduledAt && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Actual Scheduled Time
              </label>
              <p className="text-text-primary flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {formatDate(consultation.actualScheduledAt)}
              </p>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Meeting Type
            </label>
            <p className="text-text-primary flex items-center gap-2">
              {getMeetingTypeIcon(consultation.meetingType)}
              {consultation.meetingType?.replace("_", " ") || "Not specified"}
            </p>
          </div>

          {consultation.meetingLocation && consultation.meetingType === "IN_PERSON" && (
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Meeting Location
              </label>
              <p className="text-text-primary whitespace-pre-wrap flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text-muted" />
                {consultation.meetingLocation}
              </p>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Duration
            </label>
            <p className="text-text-primary">
              {consultation.meetingDuration || 60} minutes
            </p>
          </div>

          {consultation.googleMeetLink && (
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Google Meet Link
              </label>
              <a
                href={consultation.googleMeetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent underline flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                {consultation.googleMeetLink}
              </a>
            </div>
          )}

          {consultation.timezone && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Timezone
              </label>
              <p className="text-text-primary">{consultation.timezone}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Full Name
            </label>
            <p className="text-text-primary font-medium">{consultation.name}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Job Title
            </label>
            <p className="text-text-primary">{consultation.jobTitle || "Not provided"}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Email
            </label>
            <a
              href={`mailto:${consultation.email}`}
              className="text-secondary hover:text-accent underline flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {consultation.email}
            </a>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Phone
            </label>
            <a
              href={`tel:${consultation.phone}`}
              className="text-secondary hover:text-accent underline flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {consultation.phone || "Not provided"}
            </a>
          </div>

          {consultation.preferredContactMethod && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Preferred Contact Method
              </label>
              <p className="text-text-primary capitalize">
                {consultation.preferredContactMethod.toLowerCase()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Company Name
            </label>
            <p className="text-text-primary font-medium">{consultation.company || "Not provided"}</p>
          </div>

          {consultation.companyWebsite && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Website
              </label>
              <a
                href={consultation.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent underline flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {consultation.companyWebsite}
              </a>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Industry
            </label>
            <p className="text-text-primary capitalize">
              {consultation.industry?.replace(/_/g, " ").toLowerCase() || "Not provided"}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-1">
              Company Size
            </label>
            <p className="text-text-primary">
              {consultation.companySize?.replace(/_/g, "-") || "Not provided"}
            </p>
          </div>

          {consultation.country && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-1">
                Location
              </label>
              <p className="text-text-primary flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text-muted" />
                {consultation.city && `${consultation.city}, `}{consultation.country}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consultation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Consultation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {consultation.consultationTypes && consultation.consultationTypes.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-2">
                Consultation Types
              </label>
              <div className="flex flex-wrap gap-2">
                {consultation.consultationTypes.map((type) => (
                  <Badge key={type} variant="default">
                    {type.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-text-secondary block mb-2">
              Area of Interest
            </label>
            <p className="text-text-primary">{consultation.areaOfInterest || "Not provided"}</p>
          </div>

          {consultation.businessChallenge && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-2">
                Business Challenge
              </label>
              <p className="text-text-primary whitespace-pre-wrap">
                {consultation.businessChallenge}
              </p>
            </div>
          )}

          {consultation.desiredOutcome && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-2">
                Desired Outcome
              </label>
              <p className="text-text-primary whitespace-pre-wrap">
                {consultation.desiredOutcome}
              </p>
            </div>
          )}

          {consultation.currentTechnology && (
            <div>
              <label className="text-sm font-semibold text-text-secondary block mb-2">
                Current Technology Stack
              </label>
              <p className="text-text-primary whitespace-pre-wrap">
                {consultation.currentTechnology}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meeting Notes & Preparation */}
      {(consultation.meetingNotes || consultation.keyProblems || 
        consultation.potentialSolutions || consultation.clientConcerns || 
        consultation.budgetDiscussion) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Meeting Notes & Preparation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {consultation.meetingNotes && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Meeting Notes
                </label>
                <p className="text-text-primary whitespace-pre-wrap">
                  {consultation.meetingNotes}
                </p>
              </div>
            )}

            {consultation.keyProblems && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Key Problems Identified
                </label>
                <p className="text-text-primary whitespace-pre-wrap">
                  {consultation.keyProblems}
                </p>
              </div>
            )}

            {consultation.potentialSolutions && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Potential Solutions
                </label>
                <p className="text-text-primary whitespace-pre-wrap">
                  {consultation.potentialSolutions}
                </p>
              </div>
            )}

            {consultation.clientConcerns && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Client Concerns
                </label>
                <p className="text-text-primary whitespace-pre-wrap">
                  {consultation.clientConcerns}
                </p>
              </div>
            )}

            {consultation.budgetDiscussion && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Budget Discussion
                </label>
                <p className="text-text-primary whitespace-pre-wrap">
                  {consultation.budgetDiscussion}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Outcome & Follow-up */}
      {(consultation.outcome || consultation.followUpDate || consultation.followUpNotes) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Outcome & Follow-up
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultation.outcome && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Consultation Outcome
                </label>
                <Badge variant="success">
                  {consultation.outcome.replace(/_/g, " ")}
                </Badge>
              </div>
            )}

            {consultation.followUpDate && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Follow-up Date
                </label>
                <p className="text-text-primary">{formatShortDate(consultation.followUpDate)}</p>
              </div>
            )}

            {consultation.followUpNotes && (
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-2">
                  Follow-up Notes
                </label>
                <p className="text-text-primary whitespace-pre-wrap">
                  {consultation.followUpNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reminders Sent */}
      {consultation.reminders && consultation.reminders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Reminders Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {consultation.reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-3 bg-primary rounded-lg"
                >
                  <div>
                    <p className="font-medium text-text-primary">
                      {reminder.reminderType.replace(/_/g, " ")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Scheduled for: {formatDate(reminder.scheduledFor)}
                    </p>
                  </div>
                  <div>
                    {reminder.sentAt ? (
                      <Badge variant="success">
                        Sent {formatShortDate(reminder.sentAt)}
                      </Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* History */}
      {consultation.history && consultation.history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Change History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {consultation.history.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 bg-primary rounded-lg border-l-4 border-secondary"
                >
                  <p className="font-medium text-text-primary">{entry.action}</p>
                  {entry.notes && (
                    <p className="text-sm text-text-secondary mt-1">{entry.notes}</p>
                  )}
                  <p className="text-xs text-text-muted mt-2">
                    {formatDate(entry.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancellation Info */}
      {consultation.cancelledAt && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              Cancellation Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <label className="text-sm font-semibold text-red-700 block mb-1">
                Cancelled At
              </label>
              <p className="text-red-900">{formatDate(consultation.cancelledAt)}</p>
            </div>
            {consultation.cancellationReason && (
              <div>
                <label className="text-sm font-semibold text-red-700 block mb-1">
                  Reason
                </label>
                <p className="text-red-900">{consultation.cancellationReason}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Created:</span>
              <p className="font-medium text-text-primary">
                {formatShortDate(consultation.createdAt)}
              </p>
            </div>
            <div>
              <span className="text-text-muted">Updated:</span>
              <p className="font-medium text-text-primary">
                {formatShortDate(consultation.updatedAt)}
              </p>
            </div>
            {consultation.rescheduleCount !== undefined && consultation.rescheduleCount > 0 && (
              <div>
                <span className="text-text-muted">Reschedules:</span>
                <p className="font-medium text-text-primary">
                  {consultation.rescheduleCount}
                </p>
              </div>
            )}
            {consultation.googleCalendarEventId && (
              <div>
                <span className="text-text-muted">Calendar Synced:</span>
                <p className="font-medium text-green-600">Yes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
