"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { assistancePattern } from "../../data/assistance";
import { useAssistance } from "../AssistanceProvider";
import Calendar from "../Calendar";
import { useDoctors } from "../DoctorsProvider";
import styles from "./HomeSchedulesSidebar.module.css";
import { usePatients } from "../PatientsProvider";

export const HomeSchedulesSidebar = () => {
  const { assistance, date, setDate } = useAssistance();
  const { doctors } = useDoctors();
  const { patients } = usePatients();

  return (
    <div
      className={classNames(
        "container bg-light py-2 border-start overflow-y-auto",
        styles.wrapper
      )}
    >
      <div className="sticky-top">
        <Calendar
          selectedDate={date}
          onChangeSelectedDate={(dates) => {
            if (dates) setDate(dates);
          }}
        />
      </div>
      <div className="list-group mt-2">
        {assistance?.map(({ patient_id, doctor_id, status }) => (
          <Link
            key={patient_id + doctor_id}
            href="/"
            className="list-group-item d-flex align-items-center list-group-item-action"
          >
            <Image
              src={patients[patient_id].photo}
              alt=""
              width="48"
              height="48"
              className="rounded-circle me-2"
            />
            <div className="d-inline-flex flex-column">
              <span className="fw-semibold">{patients[patient_id].name}</span>
              <span className={styles.scheduleLabel}>
                {doctors[doctor_id].name}
              </span>
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
