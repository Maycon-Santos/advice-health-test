"use client";

import { formatDate } from "@/utils/date";
import { createContext, useContext, useState } from "react";

const SchedulesContext = createContext();

export const SchedulesProvider = (props) => {
  const { value, children } = props;
  const [allSchedules, setAllSchedules] = useState(value.schedules);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const schedules = allSchedules[formatDate(selectedDate)];

  const update = async (data) => {
    const updateReq = await fetch(`api/schedules`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: formatDate(selectedDate),
      }),
    });

    const response = await updateReq.json();

    setAllSchedules(response);
  };

  const remove = async (data) => {
    const removeReq = await fetch(`api/schedules`, {
      method: "DELETE",
      body: JSON.stringify({
        ...data,
        date: formatDate(selectedDate),
      }),
    });

    const response = await removeReq.json();

    setAllSchedules(response);
  };

  return (
    <SchedulesContext.Provider
      value={{
        update,
        remove,
        selectedDate,
        setSelectedDate,
        availableHours: value.availableHours,
        schedules: schedules,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};

export const useSchedules = () => {
  return useContext(SchedulesContext);
};
