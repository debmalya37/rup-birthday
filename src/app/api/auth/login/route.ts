// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connection utility
import User from "../../../../models/User";

export async function POST(req: Request) {
  await dbConnect();
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }
  
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    // For simplicity, we return the user details.
    return NextResponse.json({ message: "Login successful", user });
  } catch (err) {
    return NextResponse.json({ error: "Error during login", details: err }, { status: 500 });
  }
}
