"use client";

import classNames from "classnames";
import { assistancePattern } from "../../data/assistance";
import { useSchedules } from "../SchedulesProvider";

export const AssistanceStatistics = () => {
  const { schedulesFlat } = useSchedules();

  const assistanceStatistics = {
    scheduled: {
      amount: 0,
      ...assistancePattern.scheduled,
    },
    confirmed: {
      amount: 0,
      ...assistancePattern.confirmed,
    },
    treated: {
      amount: 0,
      ...assistancePattern.treated,
    },
    missing: {
      amount: 0,
      ...assistancePattern.missing,
    },
  };

  schedulesFlat.forEach(({ status }) => {
    assistanceStatistics[status].amount += 1;
  });

  return (
    <div className="container mt-3">
      <div className="row border rounded">
        {Object.keys(assistanceStatistics).map((key, index) => {
          const { amount, label, icon, textColor } = assistanceStatistics[key];

          return (
            <div
              key={label}
              className={classNames("col", {
                "border-start": index > 0,
              })}
            >
              <div
                className={classNames(
                  "d-flex flex-column align-items-center py-4",
                  textColor
                )}
              >
                <span className="fs-1 fw-bold">{amount}</span>
                <span>{label}</span>
                <i className={classNames("bi fs-4 mt-2", icon)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
