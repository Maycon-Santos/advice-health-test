import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const patientsContent = fs.readFileSync(
    path.resolve("./src/app/api/patients/patients.json")
  );

  return NextResponse.json(JSON.parse(patientsContent.toString()));
}
