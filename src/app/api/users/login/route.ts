import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../helpers/databaseConnection";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dataDecoder } from "../dataExtraction/route";

connectDB();

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const { email, password } = data;
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Incomplete details",
        },
        {
          status: 400,
        }
      );
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "No user",
        },
        {
          status: 409,
        }
      );
    }
    const passwordComparison = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!passwordComparison) {
      return NextResponse.json(
        {
          message: "No user",
        },
        {
          status: 409,
        }
      );
    }

    const response = NextResponse.json({
      message: "Found user",
      status: 200,
      user: existingUser,
    });

    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const jwtkey = await jwt.sign(tokenData, process.env.JWT_SECRET!);
    console.log(jwtkey);
    response.cookies.set("token", jwtkey);
    return response;
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
