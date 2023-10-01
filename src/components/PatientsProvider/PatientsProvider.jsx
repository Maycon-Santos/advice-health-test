"use client";

import { createContext, useContext } from "react";

const DoctorsContext = createContext();

export const PatientsProvider = (props) => {
  const { value, children } = props;

  return (
    <DoctorsContext.Provider value={{ patients: value }}>
      {children}
    </DoctorsContext.Provider>
  );
};

export const usePatients = () => {
  return useContext(DoctorsContext);
};
