"use client";

import classNames from "classnames";
import { useAssistance } from "../AssistanceProvider";
import { assistancePattern } from "../../data/assistance";

export const AssistanceStatistics = () => {
  const { assistance } = useAssistance();

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

  assistance?.forEach(({ status }) => {
    assistanceStatistics.scheduled.amount += 1;

    if (status === "confirmed") {
      assistanceStatistics.confirmed.amount += 1;
    }

    if (status === "treated") {
      assistanceStatistics.treated.amount += 1;
    }

    if (status === "missing") {
      assistanceStatistics.missing.amount += 1;
    }
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
