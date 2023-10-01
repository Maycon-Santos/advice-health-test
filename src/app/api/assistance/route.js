import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const assistanceContent = fs.readFileSync(
    path.resolve("./src/app/api/assistance/assistance.json")
  );

  return NextResponse.json(JSON.parse(assistanceContent.toString()));
}
