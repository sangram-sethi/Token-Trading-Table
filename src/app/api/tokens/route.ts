import { NextResponse } from "next/server";
import { mockTokens } from "@/lib/mockTokens";

export async function GET() {
  return NextResponse.json({ tokens: mockTokens });
}
