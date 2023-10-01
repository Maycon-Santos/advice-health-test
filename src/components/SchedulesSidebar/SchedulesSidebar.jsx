"use client";

import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Calendar from "../Calendar";
import { useDoctors } from "../DoctorsProvider";
import { useSchedules } from "../SchedulesProvider";
import styles from "./SchedulesSidebar.module.css";
import { formatDate } from "@/utils/date";

export const SchedulesSidebar = () => {
  const { doctors } = useDoctors();
  const { selectedDate, setSelectedDate } = useSchedules();
  const searchParams = useSearchParams();
  const selectedDoctor = searchParams.get("doctor") || Object.keys(doctors)[0];

  return (
    <div
      className={classNames(
        "container bg-light py-2 border-end overflow-y-auto",
        styles.wrapper
      )}
    >
      <div className="list-group mt-2">
        {Object.keys(doctors).map((id) => {
          const { photo, name, specialty } = doctors[id];

          return (
            <Link
              key={id}
              href={`?doctor=${id}`}
              className={classNames(
                "list-group-item d-flex align-items-center list-group-item-action",
                {
                  ["active"]: selectedDoctor === id,
                }
              )}
            >
              <Image
                src={photo}
                alt=""
                width="48"
                height="48"
                className="rounded-circle me-2"
              />
              <div className="d-inline-flex flex-column">
                <span className="fw-semibold">{name}</span>
                <span className={styles.specialtyLabel}>{specialty}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="sticky-bottom mt-3">
        <Calendar
          filterInvalidDates={(date) => {
            const dateStr = formatDate(date);

            return doctors[selectedDoctor].invalidDates.includes(dateStr);
          }}
          selectedDate={selectedDate}
          onChangeSelectedDate={(dates) => {
            if (dates) setSelectedDate(dates);
          }}
        />
      </div>
    </div>
  );
};
