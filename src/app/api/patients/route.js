import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const patientsContent = fs.readFileSync(
    path.resolve("./src/app/api/patients/patients.json")
  );

  return NextResponse.json(JSON.parse(patientsContent.toString()));
}

export async function POST(req) {
  const body = await req.json();

  const patientsContent = fs.readFileSync(
    path.resolve("./src/app/api/patients/patients.json")
  );

  const newId = uuidv4();

  const newPatientsContent = {
    ...JSON.parse(patientsContent.toString()),
    [newId]: {
      ...body,
    },
  };

  fs.writeFileSync(
    path.resolve("./src/app/api/patients/patients.json"),
    JSON.stringify(newPatientsContent)
  );

  return NextResponse.json({ id: newId, data: newPatientsContent });
}
