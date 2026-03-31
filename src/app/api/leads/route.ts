import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Demo leads endpoint - just acknowledge receipt
    console.log("Demo lead received:", body);
    return NextResponse.json({ success: true, message: "Lead received" });
  } catch (error) {
    console.error("Lead error:", error);
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
  }
}
