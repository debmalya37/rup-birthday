// app/api/user/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from   "@/lib/dbConnect"; // your MongoDB connection utility
import User from "@/models/User";



export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const updates = await req.json();
  const currentUser = await User.findById(params.id);
  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Handle "lovedOne" update with matching logic:
  if (updates.lovedOne) {
    const newLovedOne = updates.lovedOne.trim();
    // Find the user that matches the provided lovedOne username
    const lovedOneUser = await User.findOne({ username: newLovedOne });
    if (!lovedOneUser) {
      return NextResponse.json({ error: "The specified loved one does not exist" }, { status: 400 });
    }
    // Check if that user is already engaged to someone else
    if (lovedOneUser.lovedOne && lovedOneUser.lovedOne !== currentUser.username) {
      return NextResponse.json({ error: "This person is already engaged" }, { status: 400 });
    }
    // Update both profiles if not already coupled:
    currentUser.lovedOne = newLovedOne;
    lovedOneUser.lovedOne = currentUser.username;
    await lovedOneUser.save();
  }

  // Update other fields as provided
  for (let key in updates) {
    if (key !== "lovedOne") {
      if (key in currentUser) {
        (currentUser as any)[key] = updates[key];
      }
    }
  }

  await currentUser.save();
  return NextResponse.json(currentUser);
}
