// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import dbConnect from  "@/lib/dbConnect"; // your MongoDB connection utility
import User from "../../../../models/User";

export async function POST(req: Request) {
  await dbConnect();
  const {
    username,
    password,
    lovedOne,
    relationshipYears,
    age,
    gender,
    comingOnlineTime,
    nextDatePlan,
  } = await req.json();
  
  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }
  
  try {
    const newUser = new User({
      username,
      password,
      lovedOne,
      relationshipYears,
      age,
      gender,
      comingOnlineTime,
      nextDatePlan,
    });
    await newUser.save();
    return NextResponse.json({ message: "User created successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Error creating user", details: err }, { status: 500 });
  }
}
