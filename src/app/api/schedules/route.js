import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const availableHours = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export async function GET() {
  const schedulesContent = fs.readFileSync(
    path.resolve("./src/app/api/schedules/schedules.json")
  );

  return NextResponse.json({
    availableHours,
    schedules: JSON.parse(schedulesContent.toString()),
  });
}

export async function POST(req) {
  const { date, prev_hour, hour, doctor_id, patient_id, status } =
    await req.json();

  const schedulesContent = fs.readFileSync(
    path.resolve("./src/app/api/schedules/schedules.json")
  );

  const newSchedulesContent = {
    ...JSON.parse(schedulesContent.toString()),
  };

  if (!newSchedulesContent[date]) {
    newSchedulesContent[date] = {};
  }

  if (newSchedulesContent[date][prev_hour]?.[doctor_id]) {
    delete newSchedulesContent[date][prev_hour][doctor_id];
  }

  if (!newSchedulesContent[date][hour]) {
    newSchedulesContent[date][hour] = {};
  }

  newSchedulesContent[date][hour][doctor_id] = {
    patient_id,
    status,
  };

  fs.writeFileSync(
    path.resolve("./src/app/api/schedules/schedules.json"),
    JSON.stringify(newSchedulesContent)
  );

  return NextResponse.json(newSchedulesContent);
}

export async function DELETE(req) {
  const { date, hour, doctor_id } = await req.json();

  const schedulesContent = fs.readFileSync(
    path.resolve("./src/app/api/schedules/schedules.json")
  );

  const newSchedulesContent = {
    ...JSON.parse(schedulesContent.toString()),
  };

  delete newSchedulesContent[date][hour][doctor_id];

  fs.writeFileSync(
    path.resolve("./src/app/api/schedules/schedules.json"),
    JSON.stringify(newSchedulesContent)
  );

  return NextResponse.json(newSchedulesContent);
}
