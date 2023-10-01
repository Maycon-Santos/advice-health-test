"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { assistancePattern } from "../../data/assistance";
import Calendar from "../Calendar";
import { useDoctors } from "../DoctorsProvider";
import styles from "./HomeSchedulesSidebar.module.css";
import { usePatients } from "../PatientsProvider";
import { useSchedules } from "../SchedulesProvider";

export const HomeSchedulesSidebar = () => {
  const { schedules, selectedDate, setSelectedDate } = useSchedules();
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
          selectedDate={selectedDate}
          onChangeSelectedDate={(dates) => {
            if (dates) setSelectedDate(dates);
          }}
        />
      </div>
      <div className="list-group mt-2">
        {Object.keys(schedules || {}).map((hour) => {
          return Object.keys(schedules[hour] || {}).map((doctor_id) => {
            const { patient_id, status } = schedules[hour][doctor_id];

            return (
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
                  <span className="fw-semibold">
                    {patients[patient_id].name}
                  </span>
                  <span className={styles.scheduleLabel}>
                    {doctors[doctor_id].name}
                  </span>
                </div>
                <i
                  title={assistancePattern[status].shortLabel}
                  className={classNames(
                    "bi fs-5 mt-2",
                    styles.patientStatusIcon,
                    assistancePattern[status].icon,
                    assistancePattern[status].textColor
                  )}
                />
              </Link>
            );
          });
        })}
      </div>
    </div>
  );
};
