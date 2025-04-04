// app/api/couple-goals/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CoupleGoal from "../../../../models/CoupleGoal";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { option, comment, user } = await req.json();

  // Decide on progress increment based on the selected option
  let increment = 0;
  if (option === "yes") increment = 5;
  else if (option === "gonna do") increment = 2;
  else if (option === "other") increment = 1;
  // For "no", we keep increment = 0

  const goal = await CoupleGoal.findById(params.id);
  if (!goal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }
  
  // Update progress dynamically for the user
  const currentProgress = goal.progress.get(user) || 0;
  goal.progress.set(user, Math.min(currentProgress + increment, 100));
  
  // Record this update in the updates array
  goal.updates.push({ user, option, comment, date: new Date() });
  await goal.save();
  return NextResponse.json(goal);
}
