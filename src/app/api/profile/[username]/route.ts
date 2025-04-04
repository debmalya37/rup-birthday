import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
// your MongoDB connection utility
import User from "@/models/User"; // your Mongoose User model

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await User.findOne({ username }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
