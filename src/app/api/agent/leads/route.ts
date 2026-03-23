import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { LeadTemperature, LeadStatus } from "@/lib/agent/types";

/**
 * GET /api/agent/leads
 *
 * Get leads with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const temperature = searchParams.get("temperature") as LeadTemperature | null;
    const status = searchParams.get("status") as LeadStatus | null;
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Record<string, unknown> = {};

    if (temperature) {
      where.temperature = temperature;
    }

    if (status) {
      where.status = status;
    }

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        include: {
          _count: {
            select: {
              conversations: true,
              followUps: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.lead.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      count: leads.length,
      total,
      leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agent/leads
 *
 * Create a new lead manually
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lead = await db.lead.create({
      data: {
        email: body.email,
        name: body.name,
        businessName: body.businessName,
        phone: body.phone,
        temperature: body.temperature || "COLD",
        status: body.status || "NEW",
        notes: body.notes,
        source: body.source || "manual",
      },
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/agent/leads
 *
 * Update a lead (temperature, status, notes)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const lead = await db.lead.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
