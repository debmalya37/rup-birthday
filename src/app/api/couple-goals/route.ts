// app/api/couple-goals/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connection utility
import CoupleGoal from "../../../models/CoupleGoal";

export async function GET() {
  await dbConnect();
  const goals = await CoupleGoal.find({}).sort({ deadline: 1 });
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  await dbConnect();
  const { goal, deadline } = await req.json();
  if (!goal || !deadline) {
    return NextResponse.json({ error: "Goal and deadline are required" }, { status: 400 });
  }
  const coupleGoal = new CoupleGoal({ goal, deadline, progress: { user1: 0, user2: 0 } });
  await coupleGoal.save();
  return NextResponse.json(coupleGoal);
}
