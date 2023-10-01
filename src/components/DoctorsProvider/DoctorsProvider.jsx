"use client";

import { createContext, useContext } from "react";

const DoctorsContext = createContext();

export const DoctorsProvider = (props) => {
  const { value, children } = props;

  return (
    <DoctorsContext.Provider value={{ doctors: value.data }}>
      {children}
    </DoctorsContext.Provider>
  );
};

export const useDoctors = () => {
  return useContext(DoctorsContext);
};
