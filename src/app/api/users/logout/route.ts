import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logout successful",
  });
  response.cookies.set("token", "");
  return response;
}
