import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  await dbConnect();
  const { userId, title, content } = await request.json();

  if (!userId || !title || !content)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const newNote = await Note.create({ userId, title, content });
  return NextResponse.json(newNote, { status: 201 });
}

export async function PUT(request: Request) {
  await dbConnect();
  const { id, title, content } = await request.json();

  if (!id) return NextResponse.json({ error: "Missing note ID" }, { status: 400 });

  const updated = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing note ID" }, { status: 400 });

  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}
