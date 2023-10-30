import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/helpers/databaseConnection";
import User from "@/models/user";

connectDB();

export async function dataDecoder(request: NextRequest) {
  const cookieInfo = request.cookies.get("token")?.value || "";
  try {
    if (cookieInfo != "") {
      const tokenDecoded = await jwt.verify(
        cookieInfo,
        process.env.JWT_SECRET!
      );
      return {
        message: "ok",
        tokenDecoded,
      };
    }
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
  return {
    a: "x",
  };
}
