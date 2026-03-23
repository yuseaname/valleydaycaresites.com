import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateFollowUp } from "@/lib/agent/core";

/**
 * GET /api/agent/followups
 *
 * Get follow-ups (optionally filter by status)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "SCHEDULED";
    const due = searchParams.get("due") === "true";

    const where: Record<string, unknown> = { status };

    // If due=true, only get follow-ups scheduled for now or earlier
    if (due) {
      where.scheduledAt = { lte: new Date() };
    }

    const followUps = await db.followUp.findMany({
      where,
      include: {
        lead: true,
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json({
      success: true,
      count: followUps.length,
      followUps,
    });
  } catch (error) {
    console.error("Error fetching follow-ups:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agent/followups
 *
 * Create a follow-up manually
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const followUp = await db.followUp.create({
      data: {
        leadId: body.leadId,
        scheduledAt: new Date(body.scheduledAt),
        sequenceDay: body.sequenceDay || 1,
        message: body.message,
      },
      include: {
        lead: true,
      },
    });

    return NextResponse.json({
      success: true,
      followUp,
    });
  } catch (error) {
    console.error("Error creating follow-up:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agent/followups/process
 *
 * Process due follow-ups (generate and prepare messages)
 * This would typically be called by a cron job
 */
export async function PUT(request: NextRequest) {
  try {
    // Get all due follow-ups
    const dueFollowUps = await db.followUp.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: { lte: new Date() },
      },
      include: {
        lead: {
          include: {
            conversations: {
              include: {
                messages: {
                  orderBy: { sentAt: "desc" },
                  take: 5,
                },
              },
            },
          },
        },
      },
    });

    const results: Array<{
      followUpId: string;
      leadEmail: string;
      status: string;
      message?: string;
    }> = [];

    for (const followUp of dueFollowUps) {
      try {
        // Check if lead has responded recently (skip if so)
        const lastInbound = followUp.lead.conversations[0]?.messages.find(
          (m) => m.direction === "inbound"
        );

        if (lastInbound) {
          const daysSinceLastMessage =
            (Date.now() - lastInbound.sentAt.getTime()) / (1000 * 60 * 60 * 24);

          // If they responded within the last day, skip this follow-up
          if (daysSinceLastMessage < 1) {
            await db.followUp.update({
              where: { id: followUp.id },
              data: { status: "SKIPPED" },
            });

            results.push({
              followUpId: followUp.id,
              leadEmail: followUp.lead.email,
              status: "skipped",
              message: "Lead responded recently",
            });
            continue;
          }
        }

        // Generate follow-up message
        const previousMessages =
          followUp.lead.conversations[0]?.messages
            .filter((m) => m.direction === "outbound")
            .map((m) => m.content) || [];

        const message = generateFollowUp(
          followUp.lead.name || followUp.lead.email,
          followUp.sequenceDay,
          previousMessages
        );

        // Store the generated message and mark as ready to send
        await db.followUp.update({
          where: { id: followUp.id },
          data: {
            message,
            status: "SENT",
            sentAt: new Date(),
          },
        });

        results.push({
          followUpId: followUp.id,
          leadEmail: followUp.lead.email,
          status: "processed",
          message,
        });
      } catch (err) {
        results.push({
          followUpId: followUp.id,
          leadEmail: followUp.lead.email,
          status: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Error processing follow-ups:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
