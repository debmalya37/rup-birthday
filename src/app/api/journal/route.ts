// app/api/journal/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connection utility
import Journal from "@/models/Jounal";

export async function GET() {
  await dbConnect();
  const entries = await Journal.find({}).sort({ date: -1 });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  await dbConnect();
  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and Content are required" }, { status: 400 });
  }
  const entry = new Journal({ title, content, date: new Date() });
  await entry.save();
  return NextResponse.json(entry);
}
