import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      clientCompany,
      clientEmail,
      description,
      scope,
      timeline,
      budget,
      status,
      sendEmail,
    } = body;

    const proposal = await prisma.proposal.create({
      data: {
        clientCompany,
        title,
        problem: description || "",
        objectives: "",
        scope: scope || "",
        deliverables: "",
        timeline: timeline || "",
        investment: budget || "",
        status,
        sentAt: sendEmail ? new Date() : null,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: sendEmail ? "PROPOSAL_SENT" : "PROPOSAL_CREATED",
        resource: "Proposal",
        resourceId: proposal.id,
        result: "SUCCESS",
      },
    });

    // Send email if requested
    if (sendEmail && clientEmail) {
      try {
        await sendProposalEmail({
          to: clientEmail,
          clientCompany,
          title,
          description: description || "",
          scope: scope || "",
          timeline: timeline || "",
          budget: budget || "",
          proposalId: proposal.id,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail the entire request if email fails
        return NextResponse.json(
          { 
            ...proposal, 
            emailSent: false,
            emailError: "Proposal created but email failed to send"
          },
          { status: 201 }
        );
      }
    }

    return NextResponse.json({ ...proposal, emailSent: sendEmail }, { status: 201 });
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { error: "Failed to create proposal" },
      { status: 500 }
    );
  }
}

async function sendProposalEmail(data: {
  to: string;
  clientCompany: string;
  title: string;
  description: string;
  scope: string;
  timeline: string;
  budget: string;
  proposalId: string;
}) {
  // Get app URL from environment
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const proposalUrl = `${appUrl}/proposals/${data.proposalId}`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Proposal from VeyraTech</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 3px solid #1e3a8a;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 10px;
        }
        h1 {
          color: #1e3a8a;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 8px;
          font-size: 16px;
        }
        .section-content {
          color: #555;
          background: #f8f9fa;
          padding: 12px;
          border-radius: 5px;
          border-left: 3px solid #1e3a8a;
        }
        .button {
          display: inline-block;
          padding: 14px 28px;
          background: #1e3a8a;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #777;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">VeyraTech</div>
          <p style="color: #666; margin: 0;">Management & Technology Consulting</p>
        </div>
        
        <h1>New Proposal for ${data.clientCompany}</h1>
        
        <p>Dear ${data.clientCompany} Team,</p>
        
        <p>We are pleased to present our proposal for your consideration. Below is a summary of what we've prepared for you:</p>
        
        <div class="section">
          <div class="section-title">📋 Proposal Title</div>
          <div class="section-content">${data.title}</div>
        </div>
        
        ${data.description ? `
        <div class="section">
          <div class="section-title">📝 Overview</div>
          <div class="section-content">${data.description}</div>
        </div>
        ` : ''}
        
        ${data.scope ? `
        <div class="section">
          <div class="section-title">🎯 Scope of Work</div>
          <div class="section-content">${data.scope}</div>
        </div>
        ` : ''}
        
        ${data.timeline ? `
        <div class="section">
          <div class="section-title">⏱️ Timeline</div>
          <div class="section-content">${data.timeline}</div>
        </div>
        ` : ''}
        
        ${data.budget ? `
        <div class="section">
          <div class="section-title">💰 Investment</div>
          <div class="section-content">$${parseFloat(data.budget).toLocaleString()}</div>
        </div>
        ` : ''}
        
        <div style="text-align: center;">
          <a href="${proposalUrl}" class="button">View Full Proposal</a>
        </div>
        
        <p>We look forward to the opportunity to work with you. If you have any questions or would like to discuss this proposal further, please don't hesitate to reach out.</p>
        
        <p>Best regards,<br>
        <strong>The VeyraTech Team</strong></p>
        
        <div class="footer">
          <p>VeyraTech - Management & Technology Consulting</p>
          <p>This is an automated email. Please do not reply directly to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const emailText = `
VeyraTech - New Proposal

Dear ${data.clientCompany} Team,

We are pleased to present our proposal: ${data.title}

${data.description ? `Overview: ${data.description}\n\n` : ''}
${data.scope ? `Scope: ${data.scope}\n\n` : ''}
${data.timeline ? `Timeline: ${data.timeline}\n\n` : ''}
${data.budget ? `Investment: $${parseFloat(data.budget).toLocaleString()}\n\n` : ''}

View the full proposal: ${proposalUrl}

Best regards,
The VeyraTech Team
  `;

  // For now, just log the email (you'll need to configure an email service)
  console.log("=== EMAIL TO BE SENT ===");
  console.log("To:", data.to);
  console.log("Subject: New Proposal from VeyraTech -", data.title);
  console.log("========================");

  // Send email using Resend
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'VeyraTech <onboarding@resend.dev>',
    to: data.to,
    subject: `New Proposal from VeyraTech - ${data.title}`,
    html: emailHtml,
    text: emailText,
  });

  console.log("✅ Email sent successfully to:", data.to);

  return true;
}
