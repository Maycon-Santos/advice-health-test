"use client";

import classNames from "classnames";
import { getDateColorByDayLate } from "@/utils/date";
import { useNotes } from "../NotesProvider";

export const NotesTable = () => {
  const { notes, update } = useNotes();

  return (
    <div className="border rounded mt-3">
      <table className="table table-striped mb-0">
        <thead>
          <tr>
            <th scope="col">Concluído</th>
            <th scope="col">Lembrete</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(notes).map((key) => {
            const { done, date, text } = notes[key];
            const dateObj = new Date(date);
            const day = dateObj.getDate();
            const month = dateObj.getMonth();
            const year = dateObj.getFullYear();
            const dateStr = `${day}/${month + 1}/${year}`;
            const dateColor = getDateColorByDayLate(dateObj);

            return (
              <tr
                key={key}
                className={classNames({
                  ["text-decoration-line-through"]: done,
                })}
              >
                <th scope="row">
                  <label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={done}
                      onChange={(e) => {
                        update({
                          [key]: {
                            ...notes[key],
                            done: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </th>
                <td
                  className={classNames({
                    ["text-body-tertiary"]: done,
                  })}
                >
                  {text}
                </td>
                <td
                  className={classNames({
                    ["text-body-tertiary"]: done,
                    [dateColor]: !done,
                  })}
                >
                  {dateStr}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
