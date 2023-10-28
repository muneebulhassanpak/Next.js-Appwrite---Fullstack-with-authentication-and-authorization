import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../helpers/databaseConnection";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  try {
    const { username, email, password } = data;
    if (!username || !email || !password) {
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
    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email duplication",
        },
        {
          status: 409,
        }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    return NextResponse.json({
      message: "hit",
      status: 200,
      user: savedUser,
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
