import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const doctorsContent = fs.readFileSync(
    path.resolve("./src/app/api/doctors/doctors.json")
  );

  return NextResponse.json(JSON.parse(doctorsContent.toString()));
}
