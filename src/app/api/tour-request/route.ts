import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Demo tour request endpoint - just acknowledge receipt
    console.log("Demo tour request received:", body);
    return NextResponse.json({ success: true, message: "Tour request received" });
  } catch (error) {
    console.error("Tour request error:", error);
    return NextResponse.json({ error: "Failed to process tour request" }, { status: 500 });
  }
}
