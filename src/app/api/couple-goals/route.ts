// app/api/couple-goals/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connection utility
import CoupleGoal from "../../../models/CoupleGoal";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const goals = await CoupleGoal.find({
    $or: [{ creator: username }, { lovedOne: username }],
  }).sort({ deadline: 1 });

  return NextResponse.json(goals);
}


export async function POST(req: Request) {
  await dbConnect();
  const { goal, deadline, creator, lovedOne } = await req.json();

  if (!goal || !deadline || !creator || !lovedOne) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const coupleGoal = new CoupleGoal({
    goal,
    deadline,
    creator,
    lovedOne,
    progress: { [creator]: 0, [lovedOne]: 0 },
  });

  await coupleGoal.save();
  return NextResponse.json(coupleGoal);
}

