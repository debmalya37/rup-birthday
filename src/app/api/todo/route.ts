// app/api/todo/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "../../../models/Todo";

export async function GET() {
  await dbConnect();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  await dbConnect();
  const { task } = await req.json();
  if (!task) {
    return NextResponse.json({ error: "Task is required" }, { status: 400 });
  }
  const todo = new Todo({ task });
  await todo.save();
  return NextResponse.json(todo);
}
