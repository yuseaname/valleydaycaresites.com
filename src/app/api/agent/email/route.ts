import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyzeEmail, generateResponse } from "@/lib/agent/core";
import type { IncomingEmail } from "@/lib/agent/types";

/**
 * POST /api/agent/email
 *
 * Receive and process an incoming email
 * Webhook endpoint for email service (e.g., Postmark, SendGrid, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Parse incoming email
    const email: IncomingEmail = {
      from: body.from || body.From || body.sender,
      fromName: body.fromName || body.FromName || body.sender_name,
      to: body.to || body.To || body.recipient,
      subject: body.subject || body.Subject || "",
      body: body.body || body.Body || body.text || body.TextBody || "",
      receivedAt: new Date(body.receivedAt || body.Date || Date.now()),
      messageId: body.messageId || body.MessageID,
      inReplyTo: body.inReplyTo || body.InReplyTo,
    };

    // Validate required fields
    if (!email.from || !email.to) {
      return NextResponse.json(
        { error: "Missing required fields: from, to" },
        { status: 400 }
      );
    }

    // Find or create lead
    let lead = await db.lead.findUnique({
      where: { email: email.from },
    });

    if (!lead) {
      // Analyze the email first to get temperature
      const analysis = analyzeEmail(email);

      lead = await db.lead.create({
        data: {
          email: email.from,
          name: email.fromName,
          temperature: analysis.temperature,
          status: "NEW",
          notes: analysis.reasoning,
          source: "email",
        },
      });
    }

    // Find or create conversation
    let conversation = await db.conversation.findFirst({
      where: { leadId: lead.id },
      orderBy: { createdAt: "desc" },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          leadId: lead.id,
          subject: email.subject,
        },
      });
    }

    // Store the incoming message
    const incomingMessage = await db.message.create({
      data: {
        conversationId: conversation.id,
        direction: "inbound",
        content: email.body,
        fromEmail: email.from,
        toEmail: email.to,
        subject: email.subject,
      },
    });

    // Analyze the email
    const analysis = analyzeEmail(email);

    // Generate response
    const response = generateResponse(email, analysis);

    // Store the suggested reply
    await db.message.update({
      where: { id: incomingMessage.id },
      data: {
        classification: analysis.reasoning,
        suggestedReply: response.reply,
      },
    });

    // Update lead temperature if changed
    if (lead.temperature !== response.temperature) {
      await db.lead.update({
        where: { id: lead.id },
        data: {
          temperature: response.temperature,
          status: "IN_PROGRESS",
          updatedAt: new Date(),
        },
      });
    }

    // Create follow-up if needed
    if (response.shouldFollowUp && response.followUpDays) {
      const scheduledAt = new Date();
      scheduledAt.setDate(scheduledAt.getDate() + response.followUpDays);

      await db.followUp.create({
        data: {
          leadId: lead.id,
          scheduledAt,
          sequenceDay: response.followUpDays,
          message: undefined, // Will be generated when sending
        },
      });
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      conversationId: conversation.id,
      messageId: incomingMessage.id,
      analysis: {
        temperature: response.temperature,
        nextStep: response.nextStep,
      },
      suggestedReply: response.reply,
    });
  } catch (error) {
    console.error("Error processing email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/agent/email
 *
 * Get pending emails (messages with suggested replies awaiting review)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    // Get messages with suggested replies that haven't been sent
    const pendingMessages = await db.message.findMany({
      where: {
        direction: "inbound",
        suggestedReply: { not: null },
        // Messages from the last 7 days
        sentAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        conversation: {
          include: {
            lead: true,
          },
        },
      },
      orderBy: { sentAt: "desc" },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      count: pendingMessages.length,
      messages: pendingMessages,
    });
  } catch (error) {
    console.error("Error fetching pending emails:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
