"use client";

import { useState } from "react";
import { assistancePattern } from "../../data/assistance";
import { useDoctors } from "../DoctorsProvider";
import { usePatients } from "../PatientsProvider";
import { useSchedules } from "../SchedulesProvider";

export const ScheduleTable = (props) => {
  const [search, setSearch] = useState("");
  const { allSchedules } = useSchedules();
  const { patients } = usePatients();
  const { doctors } = useDoctors();

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="searchInput"
            placeholder="Busca"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <label htmlFor="searchInput">Busca</label>
        </div>
      </div>
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th scope="col">Nome do Paciente</th>
            <th scope="col">CPF do paciente</th>
            <th scope="col">Dr.</th>
            <th scope="col">Data</th>
            <th scope="col">Horário</th>
            <th scope="col">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(allSchedules).map((date) =>
            Object.keys(allSchedules[date]).map((hour) =>
              Object.keys(allSchedules[date][hour]).map((doctor_id) => {
                const { patient_id, status } =
                  allSchedules[date][hour][doctor_id];
                const patient = patients[patient_id];
                const doctor = doctors[doctor_id];
                const [year, month, day] = date.split("-");
                const formattedDate = `${day}/${month}/${year}`;

                if (
                  !patient.name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()) &&
                  !patient.cpf.includes(search.toLocaleLowerCase()) &&
                  !doctor.name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()) &&
                  !formattedDate.includes(search.toLocaleLowerCase()) &&
                  !assistancePattern[status].shortLabel
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return null;
                }

                return (
                  <tr key={date + hour + doctor_id + patient_id}>
                    <th scope="col">{patient.name}</th>
                    <th scope="col">{patient.cpf}</th>
                    <th scope="col">{doctor.name}</th>
                    <th scope="col">{formattedDate}</th>
                    <th scope="col">{hour}</th>
                    <th
                      scope="col"
                      className={assistancePattern[status].textColor}
                    >
                      {assistancePattern[status].shortLabel}
                    </th>
                    <th>
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" title="Editar">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              })
            )
          )}
        </tbody>
      </table>
    </>
  );
};
