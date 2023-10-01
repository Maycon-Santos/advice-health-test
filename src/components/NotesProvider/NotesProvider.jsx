"use client";

import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = (props) => {
  const { value, children } = props;
  const [notes, setNotes] = useState(value);

  const update = async (data) => {
    const updateReq = await fetch(`api/notes`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await updateReq.json();

    setNotes(response);
  };

  return (
    <NotesContext.Provider value={{ notes: notes.data, update }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
