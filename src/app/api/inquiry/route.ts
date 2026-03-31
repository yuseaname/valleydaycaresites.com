import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Demo inquiry endpoint - just acknowledge receipt
    console.log("Demo inquiry received:", body);
    return NextResponse.json({ success: true, message: "Inquiry received" });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
