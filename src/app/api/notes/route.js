import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const notesContent = fs.readFileSync(
    path.resolve("./src/app/api/notes/notes.json")
  );

  return NextResponse.json(JSON.parse(notesContent.toString()));
}

export async function POST(req) {
  const body = await req.json();

  const notesContent = fs.readFileSync(
    path.resolve("./src/app/api/notes/notes.json")
  );

  const newNotesContent = {
    data: {
      ...JSON.parse(notesContent.toString()).data,
      ...body,
    },
  };

  fs.writeFileSync(
    path.resolve("./src/app/api/notes/notes.json"),
    JSON.stringify(newNotesContent)
  );

  return NextResponse.json(newNotesContent);
}
