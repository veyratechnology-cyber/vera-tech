// @ts-nocheck
import React from "react";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/shared";
import { Mail, Phone, Building2, MessageSquare, Calendar } from "lucide-react";
import { format } from "date-fns";

export const metadata = {
  title: "Contact Messages | VeyraTech Admin",
};

export default async function ContactMessagesPage() {
  let messages = [];
  let error = null;

  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    console.error("Error loading contact messages:", e);
    error = e.message;
  }

  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), "PPP 'at' p");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sora font-bold text-text-primary mb-2">
          Contact Messages
        </h1>
        <p className="text-text-secondary">
          Messages from website visitors and potential clients
        </p>
      </div>

      {error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading contact messages</p>
              <p className="text-sm text-text-muted">{error}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-text-muted">Total Messages</p>
            <p className="text-2xl font-bold text-text-primary">{messages.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-text-muted">Unread</p>
            <p className="text-2xl font-bold text-text-primary">
              {messages.filter((m) => !m.isRead).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-text-muted">Today</p>
            <p className="text-2xl font-bold text-text-primary">
              {
                messages.filter(
                  (m) =>
                    new Date(m.createdAt).toDateString() === new Date().toDateString()
                ).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-muted">No contact messages yet</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className={!message.isRead ? "border-l-4 border-l-secondary" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MessageSquare className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-text-primary">
                        {message.name}
                      </h3>
                      <p className="text-sm text-text-muted flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                  {!message.isRead && (
                    <Badge variant="warning">New</Badge>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-primary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-secondary" />
                    <a
                      href={`mailto:${message.email}`}
                      className="text-sm text-secondary hover:underline"
                    >
                      {message.email}
                    </a>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-secondary" />
                      <a
                        href={`tel:${message.phone}`}
                        className="text-sm text-secondary hover:underline"
                      >
                        {message.phone}
                      </a>
                    </div>
                  )}
                  {message.company && (
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-secondary" />
                      <span className="text-sm text-text-primary">{message.company}</span>
                    </div>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-text-secondary mb-1">Subject:</p>
                  <p className="text-text-primary font-medium">{message.subject}</p>
                </div>

                {/* Message */}
                <div>
                  <p className="text-sm font-semibold text-text-secondary mb-2">Message:</p>
                  <p className="text-text-primary whitespace-pre-wrap">{message.message}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
        </>
      )}
    </div>
  );
}
