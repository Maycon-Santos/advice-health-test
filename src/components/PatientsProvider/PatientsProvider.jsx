"use client";

import { createContext, useContext, useState } from "react";

const DoctorsContext = createContext();

export const PatientsProvider = (props) => {
  const { value, children } = props;
  const [patients, setPatients] = useState(value);

  const register = async (data) => {
    const registerReq = await fetch("/api/patients", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await registerReq.json();

    setPatients(response.data);

    return response.id;
  };

  return (
    <DoctorsContext.Provider value={{ patients, register }}>
      {children}
    </DoctorsContext.Provider>
  );
};

export const usePatients = () => {
  return useContext(DoctorsContext);
};
