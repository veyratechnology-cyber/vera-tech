import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Button } from "@/components/shared";
import { CheckCircle, Calendar, Video, Phone, MapPin, Mail, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface PageProps {
  searchParams: { id?: string };
}

async function getConsultation(id: string) {
  try {
    return await prisma.consultation.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        consultationTypes: true,
        actualScheduledAt: true,
        meetingType: true,
        meetingLocation: true,  // Add location
        googleMeetLink: true,
        status: true,
        preferredDate: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch consultation:", error);
    return null;
  }
}

export default async function ConsultationSuccessPage({ searchParams }: PageProps) {
  const consultationId = searchParams.id;

  if (!consultationId) {
    redirect("/book-consultation");
  }

  const consultation = await getConsultation(consultationId);

  if (!consultation) {
    redirect("/book-consultation");
  }

  const isScheduled = !!consultation.actualScheduledAt;
  const meetingDate = consultation.actualScheduledAt
    ? new Date(consultation.actualScheduledAt)
    : consultation.preferredDate
    ? new Date(consultation.preferredDate)
    : null;

  const getMeetingTypeIcon = (type: string | null) => {
    switch (type) {
      case "GOOGLE_MEET":
        return <Video size={20} className="text-secondary" />;
      case "PHONE":
        return <Phone size={20} className="text-secondary" />;
      case "IN_PERSON":
        return <MapPin size={20} className="text-secondary" />;
      default:
        return <Calendar size={20} className="text-secondary" />;
    }
  };

  const getMeetingTypeLabel = (type: string | null) => {
    switch (type) {
      case "GOOGLE_MEET":
        return "Google Meet";
      case "PHONE":
        return "Phone Call";
      case "IN_PERSON":
        return "In-Person Meeting";
      default:
        return "To be confirmed";
    }
  };

  return (
    <section className="section bg-primary-dark min-h-screen flex items-center">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6">
              <CheckCircle size={48} className="text-success" />
            </div>
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-4">
              Consultation Confirmed!
            </h1>
            <p className="text-xl text-text-secondary">
              Thank you for booking with VeyraTech. We're looking forward to speaking with you.
            </p>
          </div>

          {/* Consultation Details Card */}
          <div className="bg-primary rounded-xl p-8 shadow-lg space-y-6">
            {/* Client Info */}
            <div className="pb-6 border-b border-border">
              <h2 className="text-2xl font-sora font-bold mb-4">Your Details</h2>
              <div className="space-y-2">
                <p className="text-text-primary">
                  <strong>Name:</strong> {consultation.name}
                </p>
                {consultation.company && (
                  <p className="text-text-primary">
                    <strong>Company:</strong> {consultation.company}
                  </p>
                )}
                <p className="text-text-primary flex items-center gap-2">
                  <Mail size={16} className="text-secondary" />
                  {consultation.email}
                </p>
              </div>
            </div>

            {/* Meeting Details */}
            {isScheduled && meetingDate ? (
              <div className="pb-6 border-b border-border">
                <h2 className="text-2xl font-sora font-bold mb-4">Meeting Schedule</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-primary-light rounded-lg">
                    <Calendar size={24} className="text-secondary mt-1" />
                    <div>
                      <p className="font-semibold text-lg text-text-primary">
                        {format(meetingDate, "EEEE, MMMM d, yyyy")}
                      </p>
                      <p className="text-text-secondary">
                        {format(meetingDate, "h:mm a")} EAT
                      </p>
                      <p className="text-sm text-text-muted mt-1">
                        <Clock size={14} className="inline mr-1" />
                        Duration: 60 minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary-light rounded-lg">
                    {getMeetingTypeIcon(consultation.meetingType)}
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">
                        {getMeetingTypeLabel(consultation.meetingType)}
                      </p>
                      {consultation.googleMeetLink && (
                        <a
                          href={consultation.googleMeetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2"
                        >
                          <Button variant="primary" size="sm">
                            <Video size={16} />
                            Join Meeting
                          </Button>
                        </a>
                      )}
                      {consultation.meetingType === "IN_PERSON" && consultation.meetingLocation && (
                        <div className="mt-3 p-3 bg-white rounded border border-border">
                          <p className="text-sm font-semibold text-text-secondary mb-1">
                            Meeting Location:
                          </p>
                          <p className="text-text-primary whitespace-pre-wrap">
                            {consultation.meetingLocation}
                          </p>
                          <p className="text-xs text-text-muted mt-2">
                            📍 We'll confirm the exact location and provide directions closer to the meeting date.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pb-6 border-b border-border">
                <h2 className="text-2xl font-sora font-bold mb-4">Next Steps</h2>
                <div className="p-4 bg-secondary/10 border-l-4 border-secondary rounded">
                  <p className="text-text-primary">
                    Our team is reviewing your request and will contact you within 1-2 business
                    days to schedule a consultation at a time that works for you.
                  </p>
                </div>
              </div>
            )}

            {/* Consultation Topics */}
            {consultation.consultationTypes && consultation.consultationTypes.length > 0 && (
              <div className="pb-6 border-b border-border">
                <h2 className="text-2xl font-sora font-bold mb-4">Consultation Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {consultation.consultationTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium"
                    >
                      {type.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* What Happens Next */}
            <div>
              <h2 className="text-2xl font-sora font-bold mb-4">What Happens Next</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-secondary font-bold">1</span>
                  </div>
                  <p className="text-text-primary">
                    <strong>Confirmation Email:</strong> You'll receive a detailed confirmation
                    email with all meeting information{consultation.googleMeetLink ? " and the Google Meet link" : ""}.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-secondary font-bold">2</span>
                  </div>
                  <p className="text-text-primary">
                    <strong>Calendar Invite:</strong> The meeting has been added to your calendar
                    automatically.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-secondary font-bold">3</span>
                  </div>
                  <p className="text-text-primary">
                    <strong>Reminders:</strong> We'll send you reminders 24 hours, 1 hour, and 10
                    minutes before the meeting.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-secondary font-bold">4</span>
                  </div>
                  <p className="text-text-primary">
                    <strong>Consultation:</strong> We'll discuss your challenges and explore how
                    VeyraTech can help achieve your goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-primary-light p-6 rounded-lg">
              <p className="text-sm text-text-muted mb-3">
                <strong>Questions or need to reschedule?</strong>
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-text-primary">
                  <Mail size={14} className="inline mr-2 text-secondary" />
                  <a href="mailto:admin@veyratech.com" className="hover:text-secondary">
                    admin@veyratech.com
                  </a>
                </p>
                <p className="text-text-primary">
                  <Phone size={14} className="inline mr-2 text-secondary" />
                  <a href="tel:+254745247211" className="hover:text-secondary">
                    +254 745 247 211
                  </a>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Return to Homepage
                </Button>
              </Link>
              <Link href="/insights" className="flex-1">
                <Button variant="primary" size="lg" className="w-full">
                  Read Our Insights
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
