"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "./Schedules.module.css";
import Calendar from "../Calendar";

export const Schedules = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div
      className={classNames(
        "container bg-light py-2 border-start",
        styles.wrapper
      )}
    >
      <Calendar
        selectedDate={selectedDate}
        onChangeSelectedDate={(dates) => {
          if (dates) setSelectedDate(dates);
        }}
      />
      <div className="list-group mt-2">
        <Link href="/" className="list-group-item d-flex align-items-center">
          <Image
            src="https://thispersondoesnotexist.com/"
            alt=""
            width="48"
            height="48"
            className="rounded-circle me-2"
          />
          <div className="d-inline-flex flex-column">
            <span className="fw-semibold">Ciclano da Silva</span>
            <span className={styles.scheduleLabel}>Dr. Drauzio</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
