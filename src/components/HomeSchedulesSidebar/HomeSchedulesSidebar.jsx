"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { assistancePattern } from "@/data/assistance";
import { useAssistance } from "../AssistanceProvider";
import Calendar from "../Calendar";
import styles from "./HomeSchedulesSidebar.module.css";

export const HomeSchedulesSidebar = () => {
  const { assistance, date, setDate } = useAssistance();

  return (
    <div
      className={classNames(
        "container bg-light py-2 border-start overflow-y-auto",
        styles.wrapper
      )}
    >
      <Calendar
        selectedDate={date}
        onChangeSelectedDate={(dates) => {
          if (dates) setDate(dates);
        }}
      />
      <div className="list-group mt-2">
        {assistance?.map(({ photo, name, doctorName, status }) => (
          <Link
            key={name + doctorName}
            href="/"
            className="list-group-item d-flex align-items-center"
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
              <span className={styles.scheduleLabel}>{doctorName}</span>
            </div>
            <i
              className={classNames(
                "bi fs-5 mt-2",
                styles.patientStatusIcon,
                assistancePattern[status].icon,
                assistancePattern[status].textColor
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
