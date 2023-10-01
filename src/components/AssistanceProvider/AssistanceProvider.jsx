"use client";

import { formatDate } from "../../utils/date";
import { createContext, useContext, useState } from "react";

const AssistanceContext = createContext();

export const AssistanceProvider = (props) => {
  const { value, children } = props;
  const [date, setDate] = useState(new Date());
  const assistance = value[formatDate(date)];

  return (
    <AssistanceContext.Provider value={{ assistance, date, setDate }}>
      {children}
    </AssistanceContext.Provider>
  );
};

export const useAssistance = () => {
  return useContext(AssistanceContext);
};
