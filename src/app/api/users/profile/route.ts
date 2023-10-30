import { NextRequest, NextResponse } from "next/server";
import { dataDecoder } from "../dataExtraction/route";

export async function GET(request: NextRequest) {
  const user = await dataDecoder(request);
  if (user.message !== "ok") {
    return NextResponse.json({
      message: "no user",
    });
  }
  return NextResponse.json({
    message: "Found user",
    user: user,
  });
}
