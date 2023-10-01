"use client";

import { createContext, useContext, useState } from "react";

const AssistanceContext = createContext();

export const AssistanceProvider = (props) => {
  const { value, children } = props;
  const [date, setDate] = useState(new Date());
  const assistance =
    value[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`];

  return (
    <AssistanceContext.Provider value={{ assistance, date, setDate }}>
      {children}
    </AssistanceContext.Provider>
  );
};

export const useAssistance = () => {
  return useContext(AssistanceContext);
};
