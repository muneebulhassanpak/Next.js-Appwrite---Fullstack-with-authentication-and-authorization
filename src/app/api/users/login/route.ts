import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../helpers/databaseConnection";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";

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

    return NextResponse.json({
      message: "Found user",
      status: 200,
      user: existingUser,
    });
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
